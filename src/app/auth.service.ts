import { Injectable, inject } from "@angular/core";
import { Auth, signInWithEmailAndPassword } from "@angular/fire/auth";
import { Observable, from } from "rxjs";

@Injectable({providedIn:'root'})

export class AuthService {
    firebaseAuth = inject(Auth)

    login(email: string, password: string): Observable<void> {
        const promise = signInWithEmailAndPassword(
            this.firebaseAuth, email, password,
        ).then(()=>{});
        return from(promise);
    }
}