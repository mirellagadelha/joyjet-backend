import { ArticleDto } from './article.dto';
import { CartDto } from './cart.dto';
import { DeliveryFeesDto } from './delivery-fee.dto';

export class CheckoutCarPostDto {
    articles: ArticleDto[];
    carts: CartDto[];
    delivery_fees: DeliveryFeesDto[];
}