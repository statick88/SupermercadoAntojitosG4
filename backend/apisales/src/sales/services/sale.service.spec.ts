import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './sale.service';
import { firebaseDataBase } from '../../firebaseConfig';
import { get, push, ref, set } from 'firebase/database';

// Mock de firebaseConfig y firebase/database
jest.mock('../../firebaseConfig', () => ({
  firebaseDataBase: jest.fn(),
}));

jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  push: jest.fn(),
  set: jest.fn(),
  get: jest.fn(),
}));

describe('SaleService', () => {
  let service: SaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleService],
    }).compile();

    service = module.get<SaleService>(SaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSale', () => {
    it('should create a new sale', async () => {
      const mockData = {
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
      const dataRefMock = {};
      const newElementRefMock = { key: 'new-sale-id' };

      (ref as jest.Mock).mockReturnValue(dataRefMock);
      (push as jest.Mock).mockReturnValue(newElementRefMock);
      (set as jest.Mock).mockResolvedValue(undefined);

      await service.createSale(mockData);

      expect(ref).toHaveBeenCalledWith(firebaseDataBase, 'Sale');
      expect(push).toHaveBeenCalledWith(dataRefMock, { dataRef: mockData });
      expect(set).toHaveBeenCalledWith(newElementRefMock, { ...mockData });
    });
  });

  describe('getSales', () => {
    it('should retrieve sales', async () => {
      const mockSales = {
        saleId1: {
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
        saleId2: {
          customerId: 'customer456',
          date: '2024-09-02',
          detail: [
            {
              productId: 'product456',
              quantity: 1,
              totalPrice: 150,
            },
          ],
        },
      };

      const dataRefMock = {};
      const snapshotMock = { val: jest.fn().mockReturnValue(mockSales) };

      (ref as jest.Mock).mockReturnValue(dataRefMock);
      (get as jest.Mock).mockResolvedValue(snapshotMock);

      const result = await service.getSales();
      expect(ref).toHaveBeenCalledWith(firebaseDataBase, 'Sale');
      expect(get).toHaveBeenCalledWith(dataRefMock);
      expect(result).toEqual(mockSales);
    });
  });

  describe('getSaleById', () => {
    it('should retrieve a sale by ID', async () => {
      const saleId = 'saleId1';
      const mockSale = {
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

      const dataRefMock = {};
      const snapshotMock = { val: jest.fn().mockReturnValue(mockSale) };

      (ref as jest.Mock).mockReturnValue(dataRefMock);
      (get as jest.Mock).mockResolvedValue(snapshotMock);

      const result = await service.getSaleById(saleId);
      expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Sale/${saleId}`);
      expect(get).toHaveBeenCalledWith(dataRefMock);
      expect(result).toEqual(mockSale);
    });
  });

  describe('updateSale', () => {
    it('should update a sale', async () => {
      const mockData = {
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
      const saleId = 'saleId1';
      const saleRefMock = {};

      (ref as jest.Mock).mockReturnValue(saleRefMock);
      (set as jest.Mock).mockResolvedValue(undefined);

      await service.updateSale(mockData, saleId);

      expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Sale/${saleId}`);
      expect(set).toHaveBeenCalledWith(saleRefMock, mockData);
    });
  });

  describe('deleteSale', () => {
    it('should delete a sale', async () => {
      const saleId = 'saleId1';
      const saleRefMock = {};

      (ref as jest.Mock).mockReturnValue(saleRefMock);
      (set as jest.Mock).mockResolvedValue(undefined);

      await service.deleteSale(saleId);

      expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Sale/${saleId}`);
      expect(set).toHaveBeenCalledWith(saleRefMock, null);
    });
  });
});
