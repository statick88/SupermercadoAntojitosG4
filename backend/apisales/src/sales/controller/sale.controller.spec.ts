import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { SaleService } from '../services/sale.service';
import { CreateSaleDto } from '../dto/createSale.dto';
import { SaleDetailDto } from '../dto/saledetail.dto';

jest.mock('../services/sale.service'); // Mock del SaleService

describe('SaleController', () => {
  let controller: SaleController;
  let service: SaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      providers: [SaleService],
    }).compile();

    controller = module.get<SaleController>(SaleController);
    service = module.get<SaleService>(SaleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createData', () => {
    it('should call createSale from SaleService', async () => {
      const createSaleDto: CreateSaleDto = {
        customerId: 'customer123',
        date: '2024-09-01',
        detail: [
          {
            productId: 'product123',
            quantity: 2,
            totalPrice: 200,
          },
        ],
      };
      await controller.createData(createSaleDto);
      expect(service.createSale).toHaveBeenCalledWith(createSaleDto);
    });
  });

  describe('getData', () => {
    it('should return sales from SaleService', async () => {
      const result = [
        {
          id: '1',
          customerId: 'customer123',
          date: '2024-09-01',
          detail: [
            {
              productId: 'product123',
              quantity: 2,
              totalPrice: 200,
            },
          ],
        },
      ]; // Mock de ventas
      jest.spyOn(service, 'getSales').mockResolvedValue(result);

      const sales = await controller.getData();
      expect(sales).toEqual(result);
      expect(service.getSales).toHaveBeenCalled();
    });
  });

  describe('getDataById', () => {
    it('should return a sale by ID from SaleService', async () => {
      const saleId = '1';
      const result = {
        id: '1',
        customerId: 'customer123',
        date: '2024-09-01',
        detail: [
          {
            productId: 'product123',
            quantity: 2,
            totalPrice: 200,
          },
        ],
      }; // Mock de venta

      jest.spyOn(service, 'getSaleById').mockResolvedValue(result);

      const sale = await controller.getDataById(saleId);
      expect(sale).toEqual(result);
      expect(service.getSaleById).toHaveBeenCalledWith(saleId);
    });
  });

  describe('updateData', () => {
    it('should call updateSale from SaleService', async () => {
      const saleId = '1';
      const updateSaleDto: CreateSaleDto = {
        customerId: 'customer123',
        date: '2024-09-01',
        detail: [
          {
            productId: 'product123',
            quantity: 3,
            totalPrice: 300,
          },
        ],
      };

      await controller.updateData(saleId, updateSaleDto);
      expect(service.updateSale).toHaveBeenCalledWith(updateSaleDto, saleId);
    });
  });

  describe('deleteData', () => {
    it('should call deleteSale from SaleService', async () => {
      const saleId = '1';

      await controller.deleteData(saleId);
      expect(service.deleteSale).toHaveBeenCalledWith(saleId);
    });
  });
});
