import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
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

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const mockData = { description: 'Product A', price: 100, stock: 10 };
      const dataRefMock = {};
      const newElementRefMock = { key: 'new-product-id' };

      (ref as jest.Mock).mockReturnValue(dataRefMock);
      (push as jest.Mock).mockReturnValue(newElementRefMock);
      (set as jest.Mock).mockResolvedValue(undefined);

      await service.createProduct(mockData);

      expect(ref).toHaveBeenCalledWith(firebaseDataBase, 'Product');
      expect(push).toHaveBeenCalledWith(dataRefMock, { dataRef: mockData });
      expect(set).toHaveBeenCalledWith(newElementRefMock, { ...mockData });
    });
  });

  describe('getProducts', () => {
    it('should retrieve products', async () => {
      const mockProducts = {
        productId1: { description: 'Product A', price: 100, stock: 10 },
        productId2: { description: 'Product B', price: 150, stock: 5 },
      };

      const dataRefMock = {};
      const snapshotMock = { val: jest.fn().mockReturnValue(mockProducts) };

      (ref as jest.Mock).mockReturnValue(dataRefMock);
      (get as jest.Mock).mockResolvedValue(snapshotMock);

      const result = await service.getProducts();
      expect(ref).toHaveBeenCalledWith(firebaseDataBase, 'Product');
      expect(get).toHaveBeenCalledWith(dataRefMock);
      expect(result).toEqual(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('should retrieve a product by ID', async () => {
      const productId = 'productId1';
      const mockProduct = { description: 'Product A', price: 100, stock: 10 };

      const dataRefMock = {};
      const snapshotMock = { val: jest.fn().mockReturnValue(mockProduct) };

      (ref as jest.Mock).mockReturnValue(dataRefMock);
      (get as jest.Mock).mockResolvedValue(snapshotMock);

      const result = await service.getProductById(productId);
      expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Product/${productId}`);
      expect(get).toHaveBeenCalledWith(dataRefMock);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const mockData = { description: 'Updated Product', price: 120, stock: 15 };
      const productId = 'productId1';
      const productRefMock = {};

      (ref as jest.Mock).mockReturnValue(productRefMock);
      (set as jest.Mock).mockResolvedValue(undefined);

      await service.updateProduct(mockData, productId);

      expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Product/${productId}`);
      expect(set).toHaveBeenCalledWith(productRefMock, mockData);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product', async () => {
      const productId = 'productId1';
      const productRefMock = {};

      (ref as jest.Mock).mockReturnValue(productRefMock);
      (set as jest.Mock).mockResolvedValue(undefined);

      await service.deleteProduct(productId);

      expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Product/${productId}`);
      expect(set).toHaveBeenCalledWith(productRefMock, null);
    });
  });
});
