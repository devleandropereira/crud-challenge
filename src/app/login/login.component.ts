import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide = true;
  loginForm: FormGroup;
  public submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.maxLength(15)]]
    });
  }

  ngOnInit(): void {}

  login() {
    this.submitted = true;
    if (this.loginForm.valid) {
      if (this.loginForm.value.username === 'admin' && this.loginForm.value.password === 'admin') {
        sessionStorage.setItem('user', '{"username": "admin", "name": "Administrador"}');
        this.router.navigate(['/payments']);
      }
    }
  }
  
}
