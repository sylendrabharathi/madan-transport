import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginApiService } from './service/api/login-api.service';
import { ToastController } from '@ionic/angular';


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
  local;
  phoneNumber: number;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loginApi: LoginApiService,
    private toaster: ToastController
  ) {
    // this.local = new Storage();
  }

  ngOnInit() { }
  login() {
    if (this.loginForm.valid) {
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
          // this.local.set('TrasnpoterId', success[0].userId);
          localStorage.setItem('TranspoterId', success.userId);
          // localStorage.setItem('TranspoterId', '4');
          this.router.navigate(['home']);
        },
          failure => {
            console.log('failure', failure);
            this.failureToaster('Id or Password is incorrect');
          });
    }
    else {
      this.loginForm.markAllAsTouched();
      this.loginForm.updateValueAndValidity();
      this.failureToaster('Kindly fill all the details');
    }
  }
  singup() {
    this.router.navigate(['sign-up']);
  }
  async failureToaster(toastMessage) {
    console.log('inside-->');
    let toast: any;

    toast = await this.toaster.create({
      message: toastMessage,
      duration: 2000,
      position: 'top',
      animated: true,
      color: "danger",
      mode: "ios"
    });

    toast.present();
  }
}
