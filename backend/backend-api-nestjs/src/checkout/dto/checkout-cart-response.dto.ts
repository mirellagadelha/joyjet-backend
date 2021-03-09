import { IsArray } from 'class-validator';
import { CartCheckoutDto } from './cart-checkout.dto';

export class CheckoutCartsResponseDto {
    @IsArray()
    carts: CartCheckoutDto[];
}