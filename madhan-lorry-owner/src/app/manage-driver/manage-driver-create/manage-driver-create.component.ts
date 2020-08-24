import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ManageDriverApiService } from '../services/api/manage-driver-api.service';

@Component({
  selector: 'app-manage-driver-create',
  templateUrl: './manage-driver-create.component.html',
  styleUrls: ['./manage-driver-create.component.scss'],
})
export class ManageDriverCreateComponent implements OnInit {

  newDriverForm = this.fb.group({
    driverName: ['', [Validators.required]],
    mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    licenceNo: ['', [Validators.required]],
    licenceValidity: [new Date, [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    cnfPassword: ['', [Validators.required, Validators.minLength(7)]]
  });
  constructor(private fb: FormBuilder,
    private driverApi: ManageDriverApiService) { }

  ngOnInit() { }
  ionViewWillEnter() { }


}
