import { Injectable, inject, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { Register } from '../../auth/register/data/register.interface';
import {
  Auth,
  signOut,
  user,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { Login } from '../../auth/login/data/login.interface';
import { User } from '../interfaces/user.interface';
import {
  Storage,
  UploadTask,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';
import { StorageReference, ref } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestore = inject(Firestore);
  private firebaseStorage = inject(Storage);
  private firebaseAuth = inject(Auth);

  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined);

  async getCurrentUser() {}

  async login(login: Login) {
    // create user in firebase auth
    await signInWithEmailAndPassword(
      this.firebaseAuth,
      login.email,
      login.password
    );
  }

  async register(register: Register) {
    // create user in firebase auth
    await createUserWithEmailAndPassword(
      this.firebaseAuth,
      register.email,
      register.password
    );

    await addDoc(collection(this.firestore, 'Users'), {
      email: register.email,
      password: register.password,
      photoUrl: register.photoUrl,
    });
  }

  async uploadPhoto(file: File): Promise<string> {
    const filePath = `images/${Date.now()}_${file.name}`;
    const storageRef: StorageReference = ref(this.firebaseStorage, filePath);

    try {
      const uploadTask = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      throw error;
    }
  }

  async logOut() {
    await signOut(this.firebaseAuth);
  }
}
