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

export async function handleCreateUser (request: Request, response: Response): Promise<Response<{id:string}>>   {
  const { email, name, password } = schema.parse(request.body);

  console.log({ email, name, password });

  const createUserParams = container.resolve(CreateUserUseCase)

  const id = await createUserParams.execute({ email, name, password });

  return response.status(201).json({ id });
}