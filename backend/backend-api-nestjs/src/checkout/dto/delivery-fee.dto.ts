import { IsNumber } from 'class-validator';
import { EligibleTransactionVolumeDto } from './eligible-transaction-volume.dto';

export class DeliveryFeeDto {
    readonly eligible_transaction_volume: EligibleTransactionVolumeDto;

    @IsNumber()
    readonly price: number;
}