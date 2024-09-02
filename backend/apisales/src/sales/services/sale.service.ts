import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from '../../firebaseConfig';


@Injectable()
export class SaleService {
  async createSale(data: any): Promise<void> {
    const dataRef = ref(firebaseDataBase, 'Sale');
    const newElementRef = push(dataRef, { dataRef: data });
    await set(newElementRef, { ...data});
    console.log('Sale created');
  }

  async getSales(): Promise<any> {
    const dataRef = ref(firebaseDataBase, 'Sale');
    const snapshot: DataSnapshot = await get(dataRef);
    const sales = snapshot.val();
    console.log('Sales retrieved');
    return sales;
  }

  async getSaleById(saleId: string): Promise<any> {
    const dataRef = ref(firebaseDataBase, `Sale/${saleId}`);
    const snapshot: DataSnapshot = await get(dataRef);
    const sale = snapshot.val();
    console.log('Sale retrieved');
    return sale;
  }

  async updateSale(data: any, saleId: string): Promise<void> {
    const saleRef = ref(firebaseDataBase, `Sale/${saleId}`);
    const snapshot: DataSnapshot = await get(saleRef);
    console.log('Sale updated');
    await set(saleRef, data );
  }

  async deleteSale(saleId): Promise<void> {
    const saleRef = ref(firebaseDataBase, `Sale/${saleId}`);
    const snapshot: DataSnapshot = await get(saleRef);
    console.log('Sale deleted');
    await set(saleRef, null);
  }
}
