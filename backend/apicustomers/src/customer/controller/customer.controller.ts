import { Body, Controller, Get, Post, UseGuards,Request, Param, Put, Delete} from '@nestjs/common';
import { CustomerService } from '../service/customer.service';
import { CustomerDto } from '../dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('createData')
  async createData(@Body() createCustomerDto: CustomerDto): Promise<void> {
    await this.customerService.createCustomer(createCustomerDto);
  }

  @Get('getData')
  async getData(): Promise<any> {
    return await this.customerService.getCustomers();
  }

  @Get('getDataById/:id')
  async getDataById(@Param('id') id: string): Promise<any> {
    return await this.customerService.getCustomerById(id);
  }

  @Put('updateData/:id')
  async updateData(
    @Body() updateCustomerDto: CustomerDto,
    @Param('id') id: string,
  ): Promise<void> {
    await this.customerService.updateCustomer(updateCustomerDto, id);
  }

  @Delete('deleteData/:id')
  async deleteData(@Param('id') id: string): Promise<void> {
    await this.customerService.deleteCustomer(id);
  }
}
