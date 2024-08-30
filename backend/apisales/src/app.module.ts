import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SaleModule } from './sales/sale.module';

@Module({
  imports: [SaleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
