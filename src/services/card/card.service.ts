import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Card } from '../../models/card.model';
const axios = require('axios');

@Injectable()
export class CardService {
    constructor(@InjectRepository(Card) private cardRepository: Repository<Card>) {}

    async findAll(): Promise<Card[]> {
        const options: FindManyOptions<Card> = { where: {} };
        return await this.cardRepository.find(options);
    }

    async findById(id: number): Promise<Card> {
        return await this.cardRepository.findOneBy({ id });
    }

    async create(card: Card): Promise<Card> {
        card.createdAt = new Date();
        return await this.cardRepository.save(card);
    }

    async update(id: number, cardData: Partial<Card>): Promise<Card> {
        await this.cardRepository.update(id, cardData);
        return this.cardRepository.findOneBy({ id });
    }

    async delete(id: number): Promise<void> {
        await this.cardRepository.delete(id);
    }
}
