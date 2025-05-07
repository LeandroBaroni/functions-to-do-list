import { Request, Response } from "express";
import { ToDo } from "src/core/models/ToDoItem";
import { container } from "tsyringe";
import { GetUseCase } from "./GetUseCase";
import { z } from "zod";
import { ApiError } from "src/core/exceptions/ApiError";

const schema = z.object({
  uid: z.string().trim()
})

export type GetParams = z.infer<typeof schema>

export async function handleGet (request: Request, response: Response): Promise<Response<ToDo[]>> {
  const { uid } = schema.parse(request.user);

  if (!uid) {
    throw new ApiError('Without permission.', 'application/without-permission', 403);
  }
  const useCase = container.resolve(GetUseCase)

  const items = await useCase.execute({ uid });

  return response.status(200).json(items);
}