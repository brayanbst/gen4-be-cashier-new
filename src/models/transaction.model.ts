import {
    ManyToOne,
    JoinColumn,
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn 
} from 'typeorm';

import { Card } from './card.model';
import { Shop } from './shop.model';

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    transactionId: string;

    @ManyToOne(() => Card)
    @JoinColumn({ name: 'cardId' })
    card: Card;

    @ManyToOne(() => Shop)
    @JoinColumn({ name: 'commerceId' })
    shop: Shop;

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

    @Column({ length: 100 })
    email: string;

    @Column({ length: 10 })
    currencyType: string;

    @Column({ length: 100 })
    description: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt: Date;
}
