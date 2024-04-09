import { Injectable, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { Blog } from '../../blog/feed/data/blog.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  async getAll() {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'Blogs'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      return data as Blog[];
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
      return [];
    }
  }
}
