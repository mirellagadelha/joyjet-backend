import { IsIn, IsNumber } from 'class-validator';
import { ArticleDiscountType } from '../enums/article-discount-type.enum';

export class ArticleDiscountDto {
    @IsNumber()
    readonly article_id: number;

    @IsIn([...Object.values(ArticleDiscountType)])
    readonly type: ArticleDiscountType;
    
    @IsNumber()
    readonly value: number;
}