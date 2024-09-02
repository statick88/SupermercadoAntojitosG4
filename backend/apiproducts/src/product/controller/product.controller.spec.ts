import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/createProduct.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn(),
            getProducts: jest.fn(),
            getProductById: jest.fn(),
            updateProduct: jest.fn(),
            deleteProduct: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createData', () => {
    it('should call createProduct on the service', async () => {
      const mockData: CreateProductDto = { description: 'Product A', price: 100, stock: 10 };
      jest.spyOn(service, 'createProduct').mockResolvedValue(undefined);

      await controller.createData(mockData);

      expect(service.createProduct).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getData', () => {
    it('should return products from the service', async () => {
      const mockProducts = {
        productId1: { description: 'Product A', price: 100, stock: 10 },
        productId2: { description: 'Product B', price: 150, stock: 5 },
      };
      jest.spyOn(service, 'getProducts').mockResolvedValue(mockProducts);

      const result = await controller.getData();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('getDataById', () => {
    it('should return a product by ID from the service', async () => {
      const mockProduct = { description: 'Product A', price: 100, stock: 10 };
      jest.spyOn(service, 'getProductById').mockResolvedValue(mockProduct);

      const result = await controller.getDataById('productId1');
      expect(result).toEqual(mockProduct);
    });
  });

  describe('updateData', () => {
    it('should call updateProduct on the service', async () => {
      const mockData: CreateProductDto = { description: 'Updated Product', price: 120, stock: 15 };
      jest.spyOn(service, 'updateProduct').mockResolvedValue(undefined);

      await controller.updateData(mockData, 'productId1');

      expect(service.updateProduct).toHaveBeenCalledWith(mockData, 'productId1');
    });
  });

  describe('deleteData', () => {
    it('should call deleteProduct on the service', async () => {
      jest.spyOn(service, 'deleteProduct').mockResolvedValue(undefined);

      await controller.deleteData('productId1');

      expect(service.deleteProduct).toHaveBeenCalledWith('productId1');
    });
  });
});
