import { SaleDetailDto } from './saledetail.dto';
import { IsString, IsNotEmpty, IsDate, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  readonly customerId: string;
  @IsDateString()
  @IsNotEmpty()
  readonly date: string;
  @IsArray()
  @ValidateNested({ each: true }) // Valida cada elemento del array
  @Type(() => SaleDetailDto) // Transforma cada elemento del array al tipo SaleDetailDto
  readonly detail: SaleDetailDto[];
}
