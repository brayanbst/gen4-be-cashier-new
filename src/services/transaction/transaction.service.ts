// src/transaction/transaction.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../../models/transaction.model';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transactions) private transactionRepository: Repository<Transactions>) {}

    async findAll(): Promise<Transactions[]> {
        return await this.transactionRepository.find();
    }

    async findById(id: number): Promise<Transactions> {
        return await this.transactionRepository.findOneBy({ id });
    }

    async create(transaction: any): Promise<Transactions> {
        transaction.createdAt = new Date();
        return await this.transactionRepository.save(transaction);
    }

    async delete(id: number): Promise<void> {
        await this.transactionRepository.delete(id);
    }

    async updateStatus(id: number): Promise<Transactions> {
        await this.transactionRepository.update(id, {updatedAt: new Date(), status: 'Processing' });
        return this.transactionRepository.findOneBy({ id });
    }
}
