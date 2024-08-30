import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  readonly address: string;
}
