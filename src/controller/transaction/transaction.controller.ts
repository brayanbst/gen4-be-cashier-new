// src/transactions/transactions.controller.ts

import { Body, Controller, Get, Post, Param, Delete, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Transactions } from '../../models/transaction.model';
import { Card } from '../../models/card.model';
import { TransactionService } from '../../services/transaction/transaction.service';
const axios = require('axios');
require('dotenv').config();

@Controller('transactions')
export class TransactionsController {
    constructor(private transactionsService: TransactionService,
        ) {}

    @Get()
    async getAllTransactions() {
        try {
            const transactions = await this.transactionsService.findAll();
            return { success: true, data: transactions };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getTransactionById(@Param('id') id: number) {
        try {
            const transaction = await this.transactionsService.findById(id);
            return { success: true, data: transaction };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async createTransaction(@Body() transactionPayload: Transactions) {
        try {
            this.validateCardExpiration(transactionPayload.card);

            const { token, lastFourDigits } = await this.processCardDetails(transactionPayload.card);
            transactionPayload.card = { ...transactionPayload.card, cardToken: token, cardNumber: lastFourDigits };

            const cardData = await this.validateCardNumberWithLuhn(transactionPayload);

            const transactionData = this.prepareTransactionData(transactionPayload, cardData);

            const newTransaction = await this.transactionsService.create(transactionData);

            const resultadoProcesamiento = await this.procesarPagoSimulado(newTransaction);
            
            return this.handlePaymentResult(newTransaction, resultadoProcesamiento);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deleteTransaction(@Param('id') id: number) {
        try {
            await this.transactionsService.delete(id);
            return { success: true, message: 'Transaction deleted successfully' };
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async generatetoken(transactionPayload: any) {
        try {
            const tokenResponse = await axios.post(process.env.TOKENIZATION_SERVICE_URL, {"cardNumber": `${JSON.parse(transactionPayload.cardNumber)}`});
            if (tokenResponse.data && tokenResponse.data.message) {
                throw new HttpException(tokenResponse.data.message, HttpStatus.BAD_REQUEST);
            }
            return tokenResponse.data;
        } catch (error) {
            if (error) {
                throw new HttpException(error.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public async validateCardNumberWithLuhn(transactionPayload: any) {
        try {
            const cardResponse = await axios.post(process.env.CARD_SERVICE_URL, transactionPayload.card);
            const cardData = cardResponse.data;            
            if (cardData.data && cardData.data.message) {
                throw new HttpException(cardData.data.message, HttpStatus.BAD_REQUEST);
            }
            return cardData.data;
        } catch (error) {
            if (error) {
                throw new HttpException(error.response.data, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    public generarIdTransaccion() {
   
        return Date.now().toString();
    }

    public async procesarPagoSimulado(transactionPayload: any) {
        try {
            const transactionProcessing = {
                "datosTarjeta": {
                    "cardToken": transactionPayload.card.cardToken,
                    "cvv": transactionPayload.card.cvv,
                    "expirationMonth": transactionPayload.card.expirationMonth,
                    "expirationYear": transactionPayload.card.expirationYear,
                    "email": transactionPayload.card.email,
                },
                "datosTransaccion": {
                    "amount": transactionPayload.amount,
                    "transactionType": "CREDITO",
                    "processor": transactionPayload.processor,
                    "processorType": transactionPayload.processorType,
                    "currencyType": transactionPayload.currencyType,
                    "description": transactionPayload.description
                }
            }
            const cardResponse = await axios.post(process.env.PAYMENT_PROCESSING_SERVICE_URL, transactionProcessing);
            const cardData = cardResponse.data;   
            if (!cardData.success) {
                throw new HttpException(cardData.message, HttpStatus.BAD_REQUEST);
            }
            return cardData;
        } catch (error) {
            if (error) {
                throw new HttpException(error.response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    private validateCardExpiration(card: Card) {
        const expirationMonth = parseInt(card.expirationMonth);
        const expirationYear = parseInt(card.expirationYear);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        if (expirationYear < currentYear || 
            (expirationYear === currentYear && expirationMonth < currentMonth) ||
            expirationYear > currentYear + 5) {
            throw new HttpException("Fecha de expiración de la tarjeta no válida", HttpStatus.BAD_REQUEST);
        }
    }

    public async processCardDetails(card: any) {
        const { token } = await this.generatetoken(card);
        const lastFourDigits = card.cardNumber.slice(-4);
        return { token, lastFourDigits };
    }

    public prepareTransactionData(transactionPayload: Transactions, cardData: any) {
        return {
            ...transactionPayload,
            transactionId: this.generarIdTransaccion(),
            status: "Pending",
            card: { ...cardData }
        };
    }

    public async handlePaymentResult(newTransaction: Transactions, resultadoProcesamiento: any) {
        if (resultadoProcesamiento.success) {
            const response = await this.transactionsService.updateStatus(newTransaction.id);
            if (response) {
                return { success: true, data: resultadoProcesamiento };
            }
        }
        return { success: false, data: resultadoProcesamiento };
    }
}
