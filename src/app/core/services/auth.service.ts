import { Injectable, inject, signal } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestore = inject(Firestore);
  private firebaseAuth = inject(Auth);

  user$ = user(this.firebaseAuth);
  currentUserSignal = signal<User | null | undefined>(undefined);

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
    var credential = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      register.email,
      register.password
    );

    await updateProfile(credential.user, { displayName: register.username });

    await addDoc(collection(this.firestore, 'Users'), { register });
  }

  async logOut() {
    await signOut(this.firebaseAuth);
  }
}
