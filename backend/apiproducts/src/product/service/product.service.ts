import { Injectable } from '@nestjs/common';
import { DataSnapshot, push, ref, set, get } from 'firebase/database';
import { firebaseDataBase } from '../../firebaseConfig';

@Injectable()
export class ProductService {
  async createProduct(data: any): Promise<void> {
    const dataRef = ref(firebaseDataBase, 'Product');
    const newElementRef = push(dataRef, { dataRef: data });
    await set(newElementRef, { ...data });
    console.log('Product created');
  }

  async getProducts(): Promise<any> {
    const dataRef = ref(firebaseDataBase, 'Product');
    const snapshot: DataSnapshot = await get(dataRef);
    const products = snapshot.val();
    console.log('Products retrieved');
    return products;
  }

  async getProductById(productId: string): Promise<any> {
    const dataRef = ref(firebaseDataBase, `Product/${productId}`);
    const snapshot: DataSnapshot = await get(dataRef);
    const product = snapshot.val();
    console.log('Product retrieved');
    return product;
  }

  async updateProduct(data: any, productId: string): Promise<void> {
    const productRef = ref(firebaseDataBase, `Product/${productId}`);
    const snapshot: DataSnapshot = await get(productRef);
    console.log('Product updated');
    await set(productRef, data);
  }

  async deleteProduct(productId): Promise<void> {
    const productRef = ref(firebaseDataBase, `Product/${productId}`);
    const snapshot: DataSnapshot = await get(productRef);
    console.log('Product deleted');
    await set(productRef, null);
  }
}
