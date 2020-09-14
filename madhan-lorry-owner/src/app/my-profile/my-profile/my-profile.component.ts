import { Component, OnInit } from '@angular/core';
import { MyProfileApiService } from '../services/api/my-profile-api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  profileForm = this.fb.group({
    userName: ['', [Validators.required]],
    mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required]],
    password: [''],
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required]],
    cnfPassword: ['', [Validators.required]]
  });
  userForm = this.fb.group({
    refOrgid: [3],
    userName: [''],
    email: [''],
    mobileNo: [''],
    password: [''],
    processing: [],
    comments: [''],
    emailVerified: [true],
    refEmpId: [],
    refCustId: [],
    userId: [],
    isActive: [true],
    refModifiedBy: [],
  });
  userId;
  doNotProceed = false;
  editForm: boolean = true;
  constructor(private profileApi: MyProfileApiService,
    private fb: FormBuilder,
    private toaster: ToastController,
    private router: Router) { }
  profileDatas: any = [];
  ngOnInit() { }
  ionViewWillEnter() {
    this.userId = Number(localStorage.getItem('userId'));
    this.getProfileData(this.userId);
  }

  getProfileData(userId) {
    this.profileApi.getProfileData(userId).subscribe(
      success => {
        console.log('success', success);
        this.profileDatas = success[0];
        this.setProfileData();
      },
      failure => {
        console.log('failure', failure);
      }
    );
  }

  setProfileData() {
    this.profileForm.get('userName').setValue(this.profileDatas.userName);
    this.profileForm.get('mobileNo').setValue(this.profileDatas.mobileNo);
    this.profileForm.get('email').setValue(this.profileDatas.email);
    this.profileForm.get('password').setValue(this.profileDatas.password);
    this.profileForm.updateValueAndValidity();
  }

  edit() {
    console.log('edit');
    this.editForm = false;
  }

  cancel() {
    this.editForm = true;
    this.profileForm.reset();
    this.getProfileData(this.userId);
  }

  submit() {
    if (this.profileForm.valid && !this.doNotProceed) {

      console.log('this.profileForm.valid ', this.setUserData());

      this.profileApi.editProfile(this.setUserData(), this.userId).subscribe(
        success => {
          console.log('success', success);
          if (success[0].status == 2) {
            this.Toaster(success[0].msg, 'success');
            this.router.navigate(['my-profile']);
          }
          else {
            this.Toaster(success[0].msg, 'danger');
          }
        },
        failure => {
          console.log('failure', failure);

        }
      );
    }
    else {
      this.Toaster('Fill all details', 'danger');
      this.profileForm.markAllAsTouched();
      this.profileForm.updateValueAndValidity();
      return;
    }
  }

  checkOldPassword() {
    if (this.profileForm.get('oldPassword').value != this.profileForm.get('password').value) {
      this.Toaster(`Old password doesn't match`, 'warning');
      this.doNotProceed = true;
      return;
    }
  }

  checkCnfPassword() {
    if (this.profileForm.get('newPassword').value != this.profileForm.get('cnfPassword').value) {
      this.Toaster(`Password and confirm password doesn't match `, 'warning');
      this.doNotProceed = true;
      return;
    }
  }
  async Toaster(message, color) {
    console.log('inside-->');
    let toast: any;

    toast = await this.toaster.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      color: color,
      mode: "ios"
    });

    toast.present();
  }

  setUserData() {
    this.userForm.get('userName').setValue(this.profileForm.get('userName').value);
    this.userForm.get('mobileNo').setValue(this.profileForm.get('mobileNo').value);
    this.userForm.get('email').setValue(this.profileForm.get('email').value);
    this.userForm.get('password').setValue(this.profileForm.get('newPassword').value);
    this.userForm.get('comments').setValue(this.profileDatas.comments);
    this.userForm.get('isActive').setValue(this.profileDatas.isActive);
    this.userForm.get('processing').setValue(this.profileDatas.processing);
    this.userForm.get('userId').setValue(this.profileDatas.userId);
    this.userForm.get('refEmpId').setValue(this.profileDatas.refEmpId);
    this.userForm.get('refModifiedBy').setValue(this.userId);
    this.userForm.get('refCustId').setValue(this.profileDatas.refCustId);
    return this.userForm.value;
  }
}
