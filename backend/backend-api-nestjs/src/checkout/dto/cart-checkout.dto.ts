import { IsNumber } from 'class-validator';

export class CartCheckoutDto {
    @IsNumber()
    readonly id: number;
    
    @IsNumber()
    readonly total: number;
}
