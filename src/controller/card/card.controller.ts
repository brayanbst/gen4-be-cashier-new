// src/card/card.controller.ts

import { Body, Controller, Get, Post, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Card } from '../../models/card.model';
import { CardService } from '../../services/card/card.service';

@Controller('card')
export class CardController {
    constructor(private cardService: CardService) {}

    @Get()
    async getAllCards() {
        try {
            const cards = await this.cardService.findAll();
            return { success: true, data: cards };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getCardById(@Param('id') id: number) {
        try {
            const card = await this.cardService.findById(id);
            return { success: true, data: card };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createCard(@Body() cardData: Card) {
        try {
            const newCard = await this.cardService.create(cardData);
            return { success: true, data: newCard };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':id')
    async updateCard(@Param('id') id: number, @Body() cardData: Partial<Card>) {
        try {
            const updatedCard = await this.cardService.update(id, cardData);
            return { success: true, data: updatedCard };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    async deleteCard(@Param('id') id: number) {
        try {
            await this.cardService.delete(id);
            return { success: true, message: 'Card deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
