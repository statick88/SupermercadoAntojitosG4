import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class SaleDetailDto {
  @IsString()
  @IsNotEmpty()
  readonly productId: string;
  @IsNumber()
  @IsNotEmpty()
  readonly quantity: number;
  @IsNumber()
  @IsNotEmpty()
  readonly totalPrice: number;
}
