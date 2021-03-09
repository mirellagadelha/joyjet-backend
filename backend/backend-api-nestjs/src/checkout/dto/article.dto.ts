import { IsNumber, IsString } from 'class-validator';

export class ArticleDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
    
    @IsNumber()
    price: number;
}