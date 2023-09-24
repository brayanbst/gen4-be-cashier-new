import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'mssql',
            host: 'SQL5106.site4now.net',
            username: 'db_a7224e_movies_admin',
            password: 'Movies26#',
            port: 1433,
            database: 'db_a7224e_movies',
            entities: ['dist/**/*.model.{ts,js}']
        }
    }

}
