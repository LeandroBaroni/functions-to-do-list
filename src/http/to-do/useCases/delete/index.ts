import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";
import { DeleteUseCase } from "./DeleteUseCase";

const schema = z.object({
  id: z.number()
});
export type DeleteParams = z.infer<typeof schema>;

export function handleDelete (request: Request, response: Response) {
  const { id } = schema.parse(request.params);

  const deleteUseCase = container.resolve(DeleteUseCase)

  deleteUseCase.execute({ id });

  return response.status(200).json({ id })
}