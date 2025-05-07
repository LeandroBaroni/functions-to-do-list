import { Request, Response } from "express";
import { z } from "zod";
import { UpdateUseCase } from "./UpdateUseCase";
import { container } from "tsyringe";

const schema = z.object({
  id: z.string().trim()
});

export type DeleteParams = z.infer<typeof schema>

export async function handleUpdate (request: Request, response: Response): Promise<Response<{ description: string; }>> {
  const { id } = schema.parse(request.body);

  const updateUseCase = container.resolve(UpdateUseCase);

  await updateUseCase.execute({ id });

  return response.status(200).json({ description: 'Tarefa marcada como completa!' });
}