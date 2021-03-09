import { IsNumber } from 'class-validator';

export class EligibleTransactionVolumeDto {
    @IsNumber()
    min_price: number;

    @IsNumber()
    max_price: number;
}