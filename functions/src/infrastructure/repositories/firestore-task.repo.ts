import { TaskRepository } from "../../domain/repositories/task-repo";
import { Task } from "../../domain/task";
import { db } from "../db/firestore";

const TCOL = 'tasks';

export class FirestoreTaskRepository implements TaskRepository {
  async listByUser(userId: string): Promise<Task[]> {
    const snap = await db.collection(TCOL)
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();
    return snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Task, 'id'>) }));
  }
  async getByTask(taskId: string): Promise<Task> {
    const snap = await db.collection(TCOL)
      .where('taskId', '==', taskId)
      .get();
    const doc = snap.docs[0];
    return { id: doc.id, ...(doc.data() as Omit<Task, 'id'>) };
  }
  async create(data: Omit<Task, 'id'>): Promise<Task> {
    const ref = await db.collection(TCOL).add(data);
    return { id: ref.id, ...data };
  }
  async update(taskId: string, patch: Partial<Task>): Promise<void> {
    await db.collection(TCOL).doc(taskId).update(patch);
  }
  async delete(taskId: string): Promise<void> {
    await db.collection(TCOL).doc(taskId).delete();
  }
}
