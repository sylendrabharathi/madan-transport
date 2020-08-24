import { Component, OnInit } from '@angular/core';
import { MyProfileApiService } from '../services/api/my-profile-api.service';
import { FormBuilder, Validators } from '@angular/forms';

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
  editForm: boolean = true;
  constructor(private profileApi: MyProfileApiService,
    private fb: FormBuilder) { }
  profileDatas: any = [];
  ngOnInit() { }
  ionViewWillEnter() {
    this.getProfileData(1);
  }
  getProfileData(userId) {
    this.profileApi.getProfileData(userId).subscribe(
      success => {
        console.log('success', success);
        this.profileDatas = success;
        this.setProfileData();
      },
      failure => {
        console.log('failure', failure);
      }
    );
  }
  setProfileData() {
    this.profileForm.get('userName').setValue(this.profileDatas[0].userName);
    this.profileForm.get('mobileNo').setValue(this.profileDatas[0].mobileNo);
    this.profileForm.get('email').setValue(this.profileDatas[0].email);
    this.profileForm.get('password').setValue(this.profileDatas[0].password);
    this.profileForm.updateValueAndValidity();
  }
  edit() {
    console.log('edit');
    this.editForm = false;
  }
  cancel() {
    this.editForm = true;
    this.profileForm.reset();
    this.getProfileData(1);

  }
}
