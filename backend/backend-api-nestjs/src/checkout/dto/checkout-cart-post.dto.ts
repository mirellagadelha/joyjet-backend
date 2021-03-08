import { ArticleDto } from './article.dto';
import { CartDto } from './cart.dto';

export class CheckoutCarPostDto {
    articles: ArticleDto[];
    carts: CartDto[];
}