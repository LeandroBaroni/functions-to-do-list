import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";
import { CreateToDoUseCase } from "./CreateToDoUseCase";

const schema = z.object({
  description: z.string().trim(),
  priority: z.enum([ 'low', 'media', 'high' ]),
  userId: z.number()
})

export type CreateToDoParams = z.infer<typeof schema>

export async function handleCreateToDo (request: Request, response: Response) {
  const { description, priority, userId } = schema.parse({ ...request.body, ...request.user })

  const createToDoUseCase: CreateToDoUseCase = container.resolve(CreateToDoUseCase)

  await createToDoUseCase.execute({ description, priority, userId })

  return response.status(201).json({ description, priority, userId })
}