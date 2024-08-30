import { Body, Controller, Get, Post, UseGuards,Request, Param, Put, Delete} from '@nestjs/common';
import { ProductService } from '../service/product.service';

import { CreateProductDto } from '../dto/createProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createData')
  async createData(@Body() createProductDto: CreateProductDto): Promise<void> {
    await this.productService.createProduct(createProductDto);
  }

  @Get('getData')
  async getData(): Promise<any> {
    return await this.productService.getProducts();
  }

  @Get('getDataById/:id')
  async getDataById(@Param('id') id: string): Promise<any> {
    return await this.productService.getProductById(id);
  }

  @Put('updateData/:id')
  async updateData(@Body() updateProductDto: CreateProductDto, @Param('id') id: string): Promise<void> {
    await this.productService.updateProduct(updateProductDto, id);
  }

  @Delete('deleteData/:id')
  async deleteData(@Param('id') id: string): Promise<void> {
    await this.productService.deleteProduct(id);
  }
}
