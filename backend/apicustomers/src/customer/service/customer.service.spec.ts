import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { firebaseDataBase } from '../../firebaseConfig';
import { get, push, ref, set } from 'firebase/database';

jest.mock('../../firebaseConfig', () => ({
    firebaseDataBase: jest.fn(),
  }));

jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  get: jest.fn(),
  set: jest.fn(),
  push: jest.fn(),
}));

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a customer', async () => {
    const data = { name: 'John Doe', email: 'john@example.com' };
    const dataRefMock = {};
    const newElementRefMock = {};

    (ref as jest.Mock).mockReturnValue(dataRefMock);
    (push as jest.Mock).mockReturnValue(newElementRefMock);
    (set as jest.Mock).mockResolvedValue(undefined);

    await service.createCustomer(data);

    expect(ref).toHaveBeenCalledWith(firebaseDataBase, 'Customer');
    expect(push).toHaveBeenCalledWith(dataRefMock, { dataRef: data });
    expect(set).toHaveBeenCalledWith(newElementRefMock, { ...data });
  });

  it('should retrieve all customers', async () => {
    const customers = { '1': { name: 'John Doe', email: 'john@example.com' } };
    const dataRefMock = {};
    const snapshotMock = { val: jest.fn().mockReturnValue(customers) };

    (ref as jest.Mock).mockReturnValue(dataRefMock);
    (get as jest.Mock).mockResolvedValue(snapshotMock);

    const result = await service.getCustomers();

    expect(ref).toHaveBeenCalledWith(firebaseDataBase, 'Customer');
    expect(get).toHaveBeenCalledWith(dataRefMock);
    expect(result).toEqual(customers);
  });

  it('should retrieve a customer by id', async () => {
    const customerId = '1';
    const customer = { name: 'John Doe', email: 'john@example.com' };
    const dataRefMock = {};
    const snapshotMock = { val: jest.fn().mockReturnValue(customer) };

    (ref as jest.Mock).mockReturnValue(dataRefMock);
    (get as jest.Mock).mockResolvedValue(snapshotMock);

    const result = await service.getCustomerById(customerId);

    expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Customer/${customerId}`);
    expect(get).toHaveBeenCalledWith(dataRefMock);
    expect(result).toEqual(customer);
  });

  it('should update a customer', async () => {
    const customerId = '1';
    const data = { name: 'John Doe', email: 'john@example.com' };
    const customerRefMock = {};

    (ref as jest.Mock).mockReturnValue(customerRefMock);
    (set as jest.Mock).mockResolvedValue(undefined);

    await service.updateCustomer(data, customerId);

    expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Customer/${customerId}`);
    expect(set).toHaveBeenCalledWith(customerRefMock, data);
  });

  it('should delete a customer', async () => {
    const customerId = '1';
    const customerRefMock = {};

    (ref as jest.Mock).mockReturnValue(customerRefMock);
    (set as jest.Mock).mockResolvedValue(undefined);

    await service.deleteCustomer(customerId);

    expect(ref).toHaveBeenCalledWith(firebaseDataBase, `Customer/${customerId}`);
    expect(set).toHaveBeenCalledWith(customerRefMock, null);
  });
});
