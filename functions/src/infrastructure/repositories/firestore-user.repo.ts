import { UserRepository } from "../../domain/repositories/user-repo";
import { User } from "../../domain/user";
import { db } from "../db/firestore";

const UCOL = 'users';

export class FirestoreUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const snap = await db.collection(UCOL).where('email', '==', email).limit(1).get();
    if (snap.empty) return null;
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as Omit<User, 'id'>) };
  }
  async create(email: string): Promise<User> {
    const payload = { email, createdAt: Date.now() };
    const ref = await db.collection(UCOL).add(payload);
    return { id: ref.id, ...payload };
  }
}
