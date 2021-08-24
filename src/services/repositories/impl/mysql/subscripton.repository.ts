import connector from '../../../../common/persistence/mysql.persistence'
import { Subscription } from '../../domain/subscription'

export class SubscriptionMySQLRepository {
    public async getAll(): Promise<Subscription[]> {
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        )

        return rows as Subscription[]
    }

    public async findOneById(id: number): Promise<Subscription[] | null>  {
        const [row]: any[] = await connector.execute(
            'SELECT * FROM wallet_subscription WHERE id = ?', [id]
        )

        if (row.length) {
            return row[0] as Subscription[]
        }

        return null
    }

    public async updateById(entry: Subscription): Promise<void> {
        const now = new Date()

        await connector.execute(
            'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
            [entry.user_id, entry.code, entry.amount, entry.cron, now, entry.id]
        )
    }

    public async deleteById(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM wallet_subscription WHERE id = ?',
            [id]
        )
    }

    public async store(entry: Subscription): Promise<void> {
        const now = new Date()

        await connector.execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES (?, ?, ?, ?, ?)',
            [entry.user_id, entry.code, entry.amount, entry.cron, now]
        )
    }

}