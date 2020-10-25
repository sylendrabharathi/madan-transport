import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginApiService } from './service/api/login-api.service';
import { LocalStorageService } from '../service/local-storage/local-storage.service';
import { ToastService } from '../service/toast/toast.service';
import { LoaderService } from '../service/Loader/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userId: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });
  userName = '';
  userId = '';
  // local;
  phoneNumber: number;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginApi: LoginApiService,
    private toast: ToastService,
    private ls: LocalStorageService,
    private loader: LoaderService
  ) {
    // this.local = new Storage();
  }

  ngOnInit() { }
  login() {
    if (this.loginForm.valid) {
      this.loader.createLoader();
      const val: string = this.loginForm.get('userId').value;
      console.log('val', val, val.indexOf('@'));

      if (val.indexOf('@') > -1) {
        this.userId = val;
      }
      else if (!isNaN(Number(val))) {
        this.phoneNumber = Number(val);
      }
      else {
        this.userName = val;
      }
      this.loginApi.login(this.userName, this.userId, this.phoneNumber, this.loginForm.get('password').value)
        .subscribe((success: any) => {
          console.log('success', success);
          this.ls.setUserId(success[0].userId.toString())

          // localStorage.setItem('newId', success[0].userId);
          this.ls.setCustomerId(success[0].customerId.toString())
          this.loader.dismissLoader();
          this.router.navigate(['home']);
        },
          failure => {
            this.loader.dismissLoader();
            console.log('failure', failure);
            this.toast.danger('Id or Password is incorrect');
          });
    }
    else {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
      this.toast.danger('Kindly fill all the details');
    }
  }
  singup() {
    this.router.navigate(['sign-up']);
  }

}
