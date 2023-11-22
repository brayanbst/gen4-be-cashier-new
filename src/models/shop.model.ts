import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    commerceId: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    contactInformation: string;

    @Column()
    active: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}
