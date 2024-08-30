
import { Body, Controller, Get, Post, UseGuards,Request, Param, Put, Delete} from '@nestjs/common';
import { SaleService } from '../services/sale.service';

import { CreateSaleDto } from '../dto/createSale.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('createData')
  async createData(@Body() createSaleDto: CreateSaleDto): Promise<void> {
    await this.saleService.createSale(createSaleDto);
  }

  @Get('getData')
  async getData(): Promise<any> {
    return await this.saleService.getSales();
  }

  @Get('getDataById/:id')
  async getDataById(@Param('id') id: string): Promise<any> {
    return await this.saleService.getSaleById(id);
  }

  @Put('updateData/:id')
  async updateData(@Param('id') id: string, @Body() updateSaleDto: CreateSaleDto): Promise<void> {
    await this.saleService.updateSale(updateSaleDto, id);
  }

  @Delete('deleteData/:id')
  async deleteData(@Param('id') id: string): Promise<void> {
    await this.saleService.deleteSale(id);
  }
}