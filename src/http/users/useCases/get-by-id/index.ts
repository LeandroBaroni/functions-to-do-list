import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { GetByIdUsecase } from "./GetByIdUseCase";
import { User } from "src/core/models/User";

const schema = z.object({
  id: z.string().trim()
})

export type GetByIdParams = z.infer<typeof schema>

export async function handleGetById (request: Request, response: Response): Promise<Response<User>> {
  const { id } = schema.parse(request.params)

  const getByIdUsecase = container.resolve(GetByIdUsecase)

  const user = await getByIdUsecase.execute({ id });

  return response.status(200).json(user);
}