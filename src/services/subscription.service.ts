import { ApplicationException } from "../common/exceptions/application.exception";
import { Subscription } from "./repositories/domain/subscription";
import { SubscriptionRepository } from "./repositories/subscripcion.repository";


export class SubscriptionService {
    constructor(
        private readonly subscriptionRepository: SubscriptionRepository
    ) {}

    public async getAll(): Promise<Subscription[]> {
        return await this.subscriptionRepository.getAll()
    }

    public async findOneById(id: number): Promise<Subscription[] | null> {
        return await this.subscriptionRepository.findOneById(id)
    }

    public async updateById(id: number, entry: SubscriptionUpdateDto): Promise<void> {
        const originalEntry = await this.subscriptionRepository.findOneById(id)

    }

    public async deleteById(id: number): Promise<void> {
        await this.subscriptionRepository.deleteById(id)
    }

    public async store(entry: SubscriptionCreateDto): Promise<void> {
        const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code)
        
        if (!originalEntry) {
            await this.subscriptionRepository.store(entry as Subscription)
        }
        throw new ApplicationException('User subscription already exists.')
    }
}