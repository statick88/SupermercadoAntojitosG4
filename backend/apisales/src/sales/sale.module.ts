import { Module } from '@nestjs/common';
import { SaleService } from './services/sale.service';
import { SaleController } from './controller/sale.controller';

@Module({
  providers: [SaleService],
  controllers: [SaleController]
})
export class SaleModule {}
