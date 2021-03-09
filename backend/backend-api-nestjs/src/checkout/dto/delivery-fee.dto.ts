import { IsNumber } from 'class-validator';
import { EligibleTransactionVolumeDto } from "./eligible-transaction-volume.dto";

export class DeliveryFeesDto {
    eligible_transaction_volume: EligibleTransactionVolumeDto;

    @IsNumber()
    price: number;
}