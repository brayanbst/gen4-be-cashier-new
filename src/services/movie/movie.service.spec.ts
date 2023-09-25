import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieService } from './movie.service';
import { Movies } from '../../models/movies.model';
import { Repository } from 'typeorm';

const mockMoviesRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  // Agrega otras funciones de repositorio que uses en el servicio
};

describe('MovieService', () => {
  let service: MovieService;
  let repository: Repository<Movies>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movies),
          useValue: mockMoviesRepository,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    repository = module.get<Repository<Movies>>(getRepositoryToken(Movies));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const expectedMovies: Movies[] = []; // Define aquí los datos que esperas obtener
      mockMoviesRepository.find.mockReturnValue(expectedMovies);

      const result = await service.findAll();

      expect(result).toEqual(expectedMovies);
    });
  });
});
