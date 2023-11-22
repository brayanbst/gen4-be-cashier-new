import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Card } from './card.model';
import { Shop } from './shop.model';

@Entity()
export class TransactionLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    transactionId: string;

    @ManyToOne(() => Card)
    cardId: number;

    @ManyToOne(() => Shop)
    commerceId: number;

    @Column({ length: 50 })
    transactionType: string;

    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;

    @Column({ length: 50 })
    status: string;

    @Column({ length: 100 })
    processor: string;

    @Column({ length: 50 })
    processorType: string;

    @Column({ length: 500 })
    transactionMessage: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
