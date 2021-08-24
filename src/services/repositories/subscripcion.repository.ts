import { Subscription } from "./domain/subscription";

export interface SubscriptionRepository {
    getAll(): Promise<Subscription[]>;
    findOneById(id: number): Promise<Subscription[] | null>;
    findByUserAndCode(user_id: number, code: string): Promise<Subscription[] | null>;
    updateById(entry: Subscription): Promise<void>;
    deleteById(id: number): Promise<void>;
    store(entry: Subscription): Promise<void>;
}