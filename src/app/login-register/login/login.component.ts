import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hasError = false;
  hasErrorMessage = '';

  constructor(private router: Router, private authService: AuthService) {
    const user = localStorage.getItem('User');
    if (user) {
      const newUser = JSON.parse(user);
      if (newUser.role === 'admin') {
        this.router.navigate([`/admin`]);
      } else if (newUser.role === 'dietitian') {
        this.router.navigate(['/dietitian']);
      } else if (newUser.role === 'patient') {
        this.router.navigate(['/patient']);
      } else {
        this.router.navigate(['/']);
      }
    } else {
      //this.router.navigate(['/']);
    }
  }

  user: any;

  LoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  get password() {
    return this.LoginForm.get('password');
  }

  get email() {
    return this.LoginForm.get('email');
  }

  ngOnInit(): void {}
  loginUser() {
    this.authService.login(this.LoginForm.value).subscribe(
      (data) => {
        this.user = data.user;
        localStorage.setItem('Token', JSON.stringify(data.tokens.access));
        localStorage.setItem(
          'RefreshToken',
          JSON.stringify(data.tokens.refresh)
        );
        localStorage.setItem('User', JSON.stringify(this.user));
      },
      (error) => {
        console.log(error);
        if (error.error.code === 401) {
          this.hasError = true;
          this.hasErrorMessage = error.error.message;
        }
      },
      () => {
        if (this.user.role === 'admin') {
          this.router.navigate([`/admin`]);
        } else if (this.user.role === 'dietitian') {
          this.router.navigate(['/dietitian']);
        } else if (this.user.role === 'patient') {
          this.router.navigate(['/patient']);
        } else {
          this.router.navigate(['/']);
        }
      }
    );
  }
}
