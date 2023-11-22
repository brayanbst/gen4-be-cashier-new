import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeormService } from './services/typeorm/typeorm.service';
import { CardService } from './services/card/card.service';
import { TransactionService } from './services/transaction/transaction.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Card } from './models/card.model';
import { Transactions } from './models/transaction.model';

import { CardController } from './controller/card/card.controller';
import { TransactionsController } from './controller/transaction/transaction.controller';

@Module({
  controllers: [AppController, TransactionsController, CardController],
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Transactions, Card])
  ],
  providers: [AppService, TypeormService, TransactionService, CardService],
})
export class AppModule {}
