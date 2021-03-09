import { IsNumber } from 'class-validator';

export class CartCheckoutDto {
    @IsNumber()
    id: number;
    
    @IsNumber()
    total: number;
}