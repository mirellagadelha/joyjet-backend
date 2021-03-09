import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutService } from '../checkout.service';
import { ArticleDiscountDto, DeliveryFeeDto } from '../dto';
import { ArticleDiscountType } from '../enums/article-discount-type.enum';

describe('CheckoutService', () => {
  let service: CheckoutService;

  let mockDeliveryFees: DeliveryFeeDto[];
  let mockDiscounts: ArticleDiscountDto[];

  beforeEach(async () => {
    mockDeliveryFees = [
      {
        "eligible_transaction_volume": { "min_price": 0, "max_price": 1000 },
        "price": 800
      },
      {
        "eligible_transaction_volume": { "min_price": 1000, "max_price": 2000 },
        "price": 400
      },
      {
        "eligible_transaction_volume": { "min_price": 2000, "max_price": null },
        "price": 0
      }
    ];

    mockDiscounts = [
      { "article_id": 2, "type": ArticleDiscountType.AMOUNT, "value": 25 },
      { "article_id": 5, "type": ArticleDiscountType.PERCENTAGE, "value": 30 },
    ];

    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutService],
    }).compile();

    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDeliveryFee', () => {
    it('should return a correct price when passed a value that exceeds the range limit', () => {
      const actual = service.getDeliveryFee(3000, mockDeliveryFees);
      
      expect(actual).toBe(0);
    });
  });

  describe('getDiscount', () => {
    it('should return 0 when the product isnt in the discount list', () => {
      const actual = service.getDiscount({
        "id": 1, 
        "name": "water", 
        "price": 10
      }, mockDiscounts);
      expect(actual).toEqual(0);
    });

    it('should return the correct amount discount', () => {
      const actual = service.getDiscount({
        "id": 2, 
        "name": "honey", 
        "price": 200
      }, mockDiscounts);
      expect(actual).toEqual(25);
    });

    it('should return the correct percentage discount', () => {
      const actual = service.getDiscount({
        "id": 5, 
        "name": "ketchup", 
        "price": 999
      }, mockDiscounts);
      expect(actual).toEqual(299.7);
    });
  });
});
