import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from '../service/customer.service';
import { CustomerDto } from '../dto/customer.dto';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            createCustomer: jest.fn(),
            getCustomers: jest.fn(),
            getCustomerById: jest.fn(),
            updateCustomer: jest.fn(),
            deleteCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(customerController).toBeDefined();
  });

  describe('createData', () => {
    it('should call createCustomer from CustomerService with correct parameters', async () => {
      const dto: CustomerDto = {
        id: '1',
        name: 'John',
        lastname: 'Doe',
        phone: '123456789',
        address: '123 Main St',
      };

      await customerController.createData(dto);

      expect(customerService.createCustomer).toHaveBeenCalledWith(dto);
    });
  });

  describe('getData', () => {
    it('should call getCustomers from CustomerService', async () => {
      await customerController.getData();

      expect(customerService.getCustomers).toHaveBeenCalled();
    });
  });

  describe('getDataById', () => {
    it('should call getCustomerById from CustomerService with correct id', async () => {
      const id = '1';
      await customerController.getDataById(id);

      expect(customerService.getCustomerById).toHaveBeenCalledWith(id);
    });
  });

  describe('updateData', () => {
    it('should call updateCustomer from CustomerService with correct parameters', async () => {
      const dto: CustomerDto = {
        id: '1',
        name: 'Jane',
        lastname: 'Doe',
        phone: '987654321',
        address: '456 Elm St',
      };
      const id = '1';

      await customerController.updateData(dto, id);

      expect(customerService.updateCustomer).toHaveBeenCalledWith(dto, id);
    });
  });

  describe('deleteData', () => {
    it('should call deleteCustomer from CustomerService with correct id', async () => {
      const id = '1';
      await customerController.deleteData(id);

      expect(customerService.deleteCustomer).toHaveBeenCalledWith(id);
    });
  });
});
