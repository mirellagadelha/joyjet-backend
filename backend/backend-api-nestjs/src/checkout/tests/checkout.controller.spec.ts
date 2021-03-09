import { Test, TestingModule } from '@nestjs/testing';
import { CheckoutController } from '../checkout.controller';
import { CheckoutService } from '../checkout.service';
import { CheckoutCarPostDto, CheckoutCartResponseDto } from '../dto';
import { ArticleDiscountType } from '../enums/article-discount-type.enum';

describe('CheckoutController', () => {
  let controller: CheckoutController;
  let service: CheckoutService;

  let mockPostData: CheckoutCarPostDto;
  let mockCheckoutResponse: CheckoutCartResponseDto;

  beforeEach(async () => {
    mockPostData = {
      "articles": [
        { "id": 1, "name": "water", "price": 100 },
      ],
      "carts": [
        {
          "id": 1,
          "items": [
            { "article_id": 1, "quantity": 6 },
          ]
        },
      ],
      "delivery_fees": [
        {
          "eligible_transaction_volume": {
            "min_price": 0,
            "max_price": 1000
          },
          "price": 800
        },
      ],
      "discounts": [
        { "article_id": 2, "type": ArticleDiscountType.AMOUNT, "value": 25 },
      ]
    };

    mockCheckoutResponse = {
      carts: [
        {
          id: 1,
          total: 1400
      }]
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CheckoutController],
      providers: [CheckoutService],
    }).compile();

    controller = module.get<CheckoutController>(CheckoutController);
    service = module.get<CheckoutService>(CheckoutService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('when a list of carts, articles, discounts and fees is specified', () => {
    it('should return a list of carts', () => {
      const actual = controller.processCheckout(mockPostData);
      
      expect(actual).toStrictEqual(mockCheckoutResponse);
    });
  });
});
