import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 16 })
    cardToken: string;

    @Column({ length: 16 })
    cardNumber: string;

    @Column({ length: 4 })
    cvv: string;

    @Column({ length: 2 })
    expirationMonth: string;

    @Column({ length: 4 })
    expirationYear: string;

    @Column({ length: 100 })
    email: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'datetime', nullable: true })
    deletedAt: Date;
}
