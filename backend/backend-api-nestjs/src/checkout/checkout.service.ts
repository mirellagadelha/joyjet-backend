import { Injectable } from '@nestjs/common';
import { CartItemDto } from './dto/cart-item.dto';
import { CheckoutCarPostDto } from './dto/checkout-cart-post.dto';
import { CartCheckoutDto } from './dto/cart-checkout.dto';
import { ArticleDto } from './dto/article.dto';
import { CheckoutCartsResponseDto } from './dto/checkout-cart-response.dto';
import { DeliveryFeesDto } from './dto/delivery-fee.dto';

@Injectable()
export class CheckoutService {
  private cartsResponse: CheckoutCartsResponseDto;

  processCheckout(checkoutCartPost: CheckoutCarPostDto) {
    const { 
      articles, 
      carts, 
      delivery_fees: deliveryFees 
    } = checkoutCartPost;

    const cartCheckout = [];

    carts.map((cart) => {
      const cartTotal: CartCheckoutDto = { 
        id: cart.id, 
        total: this.getTotalCart(articles, cart.items, deliveryFees)
      };

      cartCheckout.push(cartTotal);
    });

    this.cartsResponse = { carts: cartCheckout }
    return this.cartsResponse;
  }

  getTotalCart(articles: ArticleDto[], carts: CartItemDto[], deliveryFees: DeliveryFeesDto[]) {
    const total = carts.reduce((sum, cart) => {
      const articleItem =  articles.find(article => article.id === cart.article_id);
      
      return sum + articleItem.price * cart.quantity;
    }, 0);

    const fee = this.getDeliveryFee(total, deliveryFees);
    return total + fee;
  }

  getDeliveryFee(total: number, deliveryFees: DeliveryFeesDto[]){
    const fee =  deliveryFees.find(fee => total >= fee.eligible_transaction_volume.min_price 
      && total < fee.eligible_transaction_volume.max_price);

    if (fee != null) return fee.price;
   
    return 0;
  }
}