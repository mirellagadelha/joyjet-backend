import { IsNumber } from 'class-validator';

export class CartItemDto {
    @IsNumber()
    readonly article_id: number;

    @IsNumber()
    readonly quantity: number;
}