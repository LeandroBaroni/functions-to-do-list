import { Request, Response } from "express";
import { container } from "tsyringe";
import z from "zod"
import { CreateUserUseCase } from './CreateUserUseCase';

const schema = z.object({
  name: z.string().trim(),
  email: z.string().trim(),
  password: z.string().trim().min(6),
});

export type CreateUserParams = z.infer<typeof schema>

export function handleCreateUser (request: Request, response: Response): Response   {
  const { email, name, password } = schema.parse(request.body);

  const createUserParams = container.resolve(CreateUserUseCase)

  createUserParams.execute({email, name, password})

  return response.status(201).json({ email, name, password })
}