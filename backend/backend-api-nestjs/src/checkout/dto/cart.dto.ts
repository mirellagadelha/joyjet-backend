import { IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartItemDto } from './cart-item.dto';

export class CartDto {
    @IsNumber()
    readonly id: number;
    
    @ValidateNested({each: true})
    @IsArray()
    @Type(() => CartItemDto)
    readonly items: CartItemDto[];
}
