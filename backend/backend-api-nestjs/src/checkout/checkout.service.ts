import { Injectable } from '@nestjs/common';
import { CartItemDto } from './dto/cart-item.dto';
import { CheckoutCarPostDto } from './dto/checkout-cart-post.dto';
import { CartCheckoutDto } from './dto/cart-checkout.dto';
import { ArticleDto } from './dto/article.dto';
import { CheckoutCartsResponseDto } from './dto/checkout-cart-response.dto';
import { DeliveryFeesDto } from './dto/delivery-fee.dto';
import { ArticleDiscountDto } from './dto/article-discount.dto';

@Injectable()
export class CheckoutService {
  private cartsResponse: CheckoutCartsResponseDto;

  processCheckout(checkoutCartPost: CheckoutCarPostDto) {
    const { 
      articles, 
      carts,
      discounts,
      delivery_fees: deliveryFees,
    } = checkoutCartPost;

    const cartCheckout = [];

    carts.map((cart) => {
      const cartTotal: CartCheckoutDto = { 
        id: cart.id, 
        total: this.getTotalCart(articles, cart.items, deliveryFees, discounts)
      };

      cartCheckout.push(cartTotal);
    });

    this.cartsResponse = { carts: cartCheckout }
    return this.cartsResponse;
  }

  getTotalCart(articles: ArticleDto[], carts: CartItemDto[], deliveryFees: DeliveryFeesDto[], discounts: ArticleDiscountDto[]) {
    let articlesTotal = carts
      .map(({ article_id, quantity }) => {
        const article =  articles.find(article => article.id === article_id);
        const price = article.price;
        const discountValue = this.getDiscount(article, discounts); 

        return (price - discountValue) * quantity;
      })
      .reduce((acc, cur) => acc + cur, 0);

    articlesTotal += this.getDeliveryFee(articlesTotal, deliveryFees);

    return Math.trunc(articlesTotal);
  }


  getDeliveryFee(total: number, deliveryFees: DeliveryFeesDto[]) {
    const fee =  deliveryFees.find(fee => total >= fee.eligible_transaction_volume.min_price
      && total < fee.eligible_transaction_volume.max_price);

    if (fee != null) return fee.price;
    
    return 0;
  }

  getDiscount(article: ArticleDto, discounts: ArticleDiscountDto[]) {
    const discount =  discounts.find(discount => discount.article_id === article.id);
    
    if (!discount) return 0;

    switch (discount.type) {
      case 'amount':
        return discount.value;
      case 'percentage':
        return (article.price * discount.value)/100;
      default:
        return 0;
    }
  }
}