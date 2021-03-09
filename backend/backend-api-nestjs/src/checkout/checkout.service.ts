import { HttpException, HttpStatus, Injectable, UseFilters } from '@nestjs/common';
import { 
  ArticleDiscountDto,
  ArticleDto,
  CartItemDto, 
  CheckoutCarPostDto, 
  CartCheckoutDto,
  CheckoutCartResponseDto,
  DeliveryFeeDto
} from './dto';

@Injectable()
export class CheckoutService {
  private cartsResponse: CheckoutCartResponseDto;

  processCheckout(checkoutCartPost: CheckoutCarPostDto): CheckoutCartResponseDto {
    const {
      articles,
      carts,
      discounts,
      delivery_fees: deliveryFees
    } = checkoutCartPost;

    const checkout = [];

    carts.map((cart) => {
      const cartCheckout: CartCheckoutDto = { 
        id: cart.id, 
        total: this.getTotalCart(articles, cart.items, discounts, deliveryFees)
      };

      checkout.push(cartCheckout);
    });

    this.cartsResponse = { carts: checkout }
    return this.cartsResponse;
  }

  getTotalCart(articles: ArticleDto[], carts: CartItemDto[],  discounts: ArticleDiscountDto[], deliveryFees: DeliveryFeeDto[]): number {
    let articlesTotal = carts
      .map(({ article_id, quantity }) => {
        const article =  articles.find(article => article.id === article_id);

        if(!article){
          throw new HttpException(`Article with id ${article_id} not found in list`, HttpStatus.NOT_FOUND);
        }

        const price = article.price;
        const discountValue = this.getDiscount(article, discounts); 

        return (price - discountValue) * quantity;
    })
    .reduce((acc, cur) => acc + cur, 0);

    articlesTotal += this.getDeliveryFee(articlesTotal, deliveryFees);

    return Math.trunc(articlesTotal);
  }

  getDiscount(article: ArticleDto, discounts: ArticleDiscountDto[]): number {
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

  getDeliveryFee(total: number, deliveryFees: DeliveryFeeDto[]): number {
    const fee =  deliveryFees.find(fee => total >= fee.eligible_transaction_volume.min_price
      && total < fee.eligible_transaction_volume.max_price);

    if (fee != null) return fee.price;
    
    return 0;
  }
}