import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movies } from 'src/models/movies.model';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(Movies) private moviesRepository: Repository<Movies>) { } I

    async findAll(): Promise<Movies[]> {
        const options: FindManyOptions<Movies> = {
            where: { status: true },
        };
        return await this.moviesRepository.find(options);
    }

    async findById(id: number): Promise<Movies> {
        return await this.moviesRepository.findOneBy({ id: id, status: true });
    }

    async create(movie: Movies): Promise<Movies> {
        return await this.moviesRepository.save(movie);
    }

    async update(movie: Movies): Promise<Movies> {
        return await this.moviesRepository.save(movie);
    }

    async delete(id: number): Promise<string> {
        await this.moviesRepository.delete(id);
        return 'OK';
    }

}
