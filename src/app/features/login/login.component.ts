import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';

import { LoginCredentials } from '../../models/login-credentials';
import { RegisterCredentials } from '../../models/register-credentials';
import { UserDto } from '../../models/user-dto';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private loginService = inject(LoginService)

  constructor(private router: Router ) { }

  username: string = '';
  password: string = '';

  showPassword: boolean = false;

  users: UserDto[] = [];

  register(){
    let userCredentials: RegisterCredentials = {
      id : 0,
      username: this.username,
      password: this.password
    }

    this.loginService.register(userCredentials).subscribe({
      next: (user: UserDto) => {
        console.log("Registration successful", user);
        alert("Registration successful. You can now log in.");
      },
      error: (error: HttpErrorResponse) => {
        console.error("Registration failed", error);

        alert('${error.message}Registration failed. Please try again.');
      }});
  }

  loginSubmit() {
    let userCredentials: LoginCredentials = {
      username: this.username,
      password: this.password
    }

    this.loginService.login(userCredentials).subscribe({
      next: (user: UserDto) => {
        if (this.username == user.username && this.password == user.password) {
          this.router.navigate(['home']);
        }
        else 
        {
          console.error("User not found");
        }

      }
    });
  }
}