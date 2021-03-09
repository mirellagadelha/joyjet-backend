
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ArticleDiscountDto } from './article-discount.dto';
import { ArticleDto } from './article.dto';
import { CartDto } from './cart.dto';
import { DeliveryFeesDto } from './delivery-fee.dto';

export class CheckoutCarPostDto {
    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => ArticleDto)
    articles: ArticleDto[];

    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => CartDto)
    carts: CartDto[];

    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => DeliveryFeesDto)
    delivery_fees: DeliveryFeesDto[];

    @ValidateNested({each: true})
    @IsArray()
    @IsNotEmpty()
    @Type(() => ArticleDiscountDto)
    discounts: ArticleDiscountDto[];
}