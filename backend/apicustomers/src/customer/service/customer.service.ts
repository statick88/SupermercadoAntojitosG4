import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from '../../firebaseConfig';

@Injectable()
export class CustomerService {
    async createCustomer(data: any): Promise<void> {
        const dataRef = ref(firebaseDataBase, 'Customer');
        const newElementRef = push(dataRef, { dataRef: data });
        await set(newElementRef, { ...data });
        console.log('Customer created');
      }
    
      async getCustomers(): Promise<any> {
        const dataRef = ref(firebaseDataBase, 'Customer');
        const snapshot: DataSnapshot = await get(dataRef);
        const customers = snapshot.val();
        console.log('Customers retrieved');
        return customers;
      }
    
      async getCustomerById(customerId: string): Promise<any> {
        const dataRef = ref(firebaseDataBase, `Customer/${customerId}`);
        const snapshot: DataSnapshot = await get(dataRef);
        const customer = snapshot.val();
        console.log('Customer retrieved');
        return customer;
      }
    
      async updateCustomer(data: any, customerId: string): Promise<void> {
        const customerRef = ref(firebaseDataBase, `Customer/${customerId}`);
        const snapshot: DataSnapshot = await get(customerRef);
        console.log('Customer updated');
        await set(customerRef, data);
      }
    
      async deleteCustomer(customerId): Promise<void> {
        const customerRef = ref(firebaseDataBase, `Customer/${customerId}`);
        const snapshot: DataSnapshot = await get(customerRef);
        console.log('Customer deleted');
        await set(customerRef, null);
      }
}
