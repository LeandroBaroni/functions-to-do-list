import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod";
import { CreateToDoUseCase } from "./CreateToDoUseCase";

const schema = z.object({
  description: z.string().trim(),
  priority: z.enum([ 'low', 'media', 'high' ]),
  uid: z.string().trim()
})

export type CreateToDoParams = z.infer<typeof schema>

export async function handleCreateToDo (request: Request, response: Response): Promise<Response<{ id: string; uid: string }>> {
  console.log(request.user);
  const { description, priority, uid } = schema.parse({ ...request.body, ...request.user })

  const createToDoUseCase: CreateToDoUseCase = container.resolve(CreateToDoUseCase)

  const id = await createToDoUseCase.execute({ description, priority, uid })

  return response.status(201).json({ id, uid })
}