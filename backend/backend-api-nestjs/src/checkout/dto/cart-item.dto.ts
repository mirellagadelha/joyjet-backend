import { IsNumber } from 'class-validator';

export class CartItemDto {
    @IsNumber()
    article_id: number;

    @IsNumber()
    quantity: number;
}