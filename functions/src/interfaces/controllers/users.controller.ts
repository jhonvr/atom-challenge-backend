import { Request, Response } from 'express';
import { FindUserUseCase } from '../../application/users/find-user';
import { CreateUserUseCase } from '../../application/users/create-user';

export class UsersController {
  constructor(
    private readonly findUser: FindUserUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  findByEmail = async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };
    const result = await this.findUser.exec(email);
    if (!result.exists) return res.status(200).json(result);
    return res.json(result);
  };

  create = async (req: Request, res: Response) => {
    const { email } = req.body as { email: string };
    const out = await this.createUser.exec(email);
    if (out.already) return res.status(200).json({ message: 'already_exists', user: out.user });
    return res.status(200).json(out.user);
  };
}
