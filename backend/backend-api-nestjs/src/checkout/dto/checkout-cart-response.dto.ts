import { IsArray } from 'class-validator';
import { CartCheckoutDto } from './cart-checkout.dto';

export class CheckoutCartResponseDto {
    @IsArray()
    carts: CartCheckoutDto[];
}