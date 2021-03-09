import { IsNumber, IsString } from 'class-validator';

export class ArticleDto {
  @IsNumber()
  readonly id: number;

  @IsString()
  readonly name: string;
    
  @IsNumber()
  readonly price: number;
}