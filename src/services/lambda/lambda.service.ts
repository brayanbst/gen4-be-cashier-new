// /src/services/lambda.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LambdaService {
    constructor(private httpService: HttpService) {}

    validateCardNumber(cardNumber: string): Observable<boolean> {
        const lambdaUrl = 'URL_DE_TU_LAMBDA';
        return this.httpService.post(lambdaUrl, { cardNumber }).pipe(
            map(response => response.data.isValid)
        );
    }
}
