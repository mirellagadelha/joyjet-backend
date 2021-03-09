import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartDto, ArticleDto, DeliveryFeeDto, ArticleDiscountDto } from './';

export class CheckoutCarPostDto {
    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => ArticleDto)
    readonly articles: ArticleDto[];

    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => CartDto)
    readonly carts: CartDto[];

    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => ArticleDiscountDto)
    readonly discounts: ArticleDiscountDto[];

    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => DeliveryFeeDto)
    readonly delivery_fees: DeliveryFeeDto[];
}
