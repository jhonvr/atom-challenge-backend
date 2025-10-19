import { UserRepository } from "../../domain/repositories/user-repo";

export class CreateUserUseCase {
  constructor(private repo: UserRepository) {}
  async exec(email: string) {
    const normalized = email.toLowerCase().trim();
    const exists = await this.repo.findByEmail(normalized);
    if (exists) return { already: true as const, user: exists };
    const user = await this.repo.create(normalized);
    return { already: false as const, user };
  }
}
