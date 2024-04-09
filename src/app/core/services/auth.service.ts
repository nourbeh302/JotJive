import { Injectable, inject, signal } from '@angular/core';
import {
  addDoc,
  collection,
  Firestore,
  doc,
  getDoc,
} from '@angular/fire/firestore';
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
import { Register } from '../../auth/register/data/register.interface';
import {
  Storage,
  ref,
  getDownloadURL,
  getStorage,
  uploadBytes,
} from '@angular/fire/storage';

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

    // add to firestore
    await addDoc(collection(this.firestore, 'Users'), {
      email: register.email,
      password: register.password,
      photoUrl: register.photoUrl,
    });

    // update user in firebase auth
    this.user$.subscribe((user) => {
      if (user) {
        updateProfile(user, { photoURL: register.photoUrl });

        this.currentUserSignal.set({
          email: user.email!,
          photoUrl: user.photoURL!,
        });
      }
    });
  }

  async uploadPhoto(file: File): Promise<string> {
    const storage = getStorage();
    const filePath = `images/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, filePath);

    try {
      await uploadBytes(storageRef, file);
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
