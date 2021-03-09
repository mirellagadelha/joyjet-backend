import { IsNumber, IsEnum } from 'class-validator';

export enum ArticleDiscountType {
    amount,
    percentage
}

export class ArticleDiscountDto {
    @IsNumber()
    article_id: number;
    
    @IsEnum(ArticleDiscountType)
    type: string;
    
    @IsNumber()
    value: number;
}