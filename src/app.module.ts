import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormService } from './services/typeorm/typeorm.service';
import { MovieService } from './services/movie/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './models/movies.model';
import { MovieController } from './controller/movie/movie.controller';

@Module({
  controllers: [AppController, MovieController],
  imports: [
    TypeOrmModule.forRootAsync({useClass: TypeormService}),
    TypeOrmModule.forFeature([Movies])
  ],
  providers: [AppService, TypeormService, MovieService],
})
export class AppModule {}
