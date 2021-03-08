import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutCarPostDto } from './dto/checkout-cart-post.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  processCheckout(@Body() checkoutCartPost: CheckoutCarPostDto) {
    return this.checkoutService.processCheckout(checkoutCartPost);
  }
}