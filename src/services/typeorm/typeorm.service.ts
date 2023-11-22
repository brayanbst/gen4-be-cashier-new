import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'mssql',
            host: 'DESKTOP-JEV966A\\SQLEXPRESS',
            username: 'nestjs',
            password: '123',
            port: 1433,
            database:  'transactions-ms-db',
            entities: ['dist/**/*.model.{ts,js}'],
            synchronize: false,
            autoLoadEntities: true,
            options: {
            encrypt: true,
            trustServerCertificate: true
            }
        }
    }

}
