import { UserRepository } from "../../domain/repositories/user-repo";

export class FindUserUseCase {
  constructor(private repo: UserRepository) {}
  async exec(email: string) {
    const user = await this.repo.findByEmail(email.toLowerCase().trim());
    return user ? { exists: true, user } : { exists: false as const };
  }
}
