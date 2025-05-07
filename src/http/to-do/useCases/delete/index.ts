import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";
import { DeleteUseCase } from "./DeleteUseCase";

const schema = z.object({
  id: z.string().trim()
});
export type DeleteParams = z.infer<typeof schema>;

export async function handleDelete (request: Request, response: Response): Promise<Response<{description: string}>> {
  const { id } = schema.parse(request.params);

  const deleteUseCase = container.resolve(DeleteUseCase)

  await deleteUseCase.execute({ id });

  return response.status(200).json({ description: 'Tarefa excluída com sucesso' })
}