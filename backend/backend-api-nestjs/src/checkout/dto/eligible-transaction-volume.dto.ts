import { IsNumber } from 'class-validator';

export class EligibleTransactionVolumeDto {
    @IsNumber()
    readonly min_price: number;

    @IsNumber()
    readonly max_price: number;
}