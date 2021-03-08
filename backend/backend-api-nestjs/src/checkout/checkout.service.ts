import { Injectable } from '@nestjs/common';
import { CartItemDto } from './dto/cart-item.dto';
import { CheckoutCarPostDto } from './dto/checkout-cart-post.dto';
import { CartCheckoutDto } from './dto/cart-checkout.dto';
import { ArticleDto } from './dto/article.dto';
import { CheckoutCartsResponseDto } from './dto/checkout-cart-response.dto';

@Injectable()
export class CheckoutService {
  private cartsResponse: CheckoutCartsResponseDto;

  processCheckout(checkoutCartPost: CheckoutCarPostDto) {
    const { articles, carts } = checkoutCartPost;
    const cartCheckout = [];

    carts.map((cart) => {
      const cartTotal: CartCheckoutDto = { 
        id: cart.id, 
        total: this.getTotalCart(articles, cart.items)
      };

      cartCheckout.push(cartTotal);
    });

    this.cartsResponse = { carts: cartCheckout }
    return this.cartsResponse;
  }

  getTotalCart(articles: ArticleDto[], carts: CartItemDto[]) {
    const total = carts.reduce((sum, cart) => {
      const articleItem =  articles.find(article => article.id === cart.article_id);
      
      return sum + articleItem.price * cart.quantity;
    }, 0);

    return total;
  }
}