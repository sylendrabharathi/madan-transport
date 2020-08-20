import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {

  registrationForm = this.fb.group({
    name: ['', [Validators.required]],
    gstno: ['', [Validators.required,
    Validators.minLength(10)]],
    panno: ['', [Validators.required,
    Validators.minLength(10)]],
    lname: ['', [Validators.required]],
    address: ['', [Validators.required]],
    naddress: ['', [Validators.required]],
    etype: ['', [Validators.required]],
    rtype: ['', [Validators.required]],
    dtype: ['', [Validators.required]],
    regdate: ['', [Validators.required]],
    telno: ['', [Validators.required]],
    mobno: ['', [Validators.required]],
    email: ['', [Validators.required]],
    website: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    fno: ['', [Validators.required]],
    add1: ['', [Validators.required]],
    add2: ['', [Validators.required]],
    lmark: ['', [Validators.required]],
  });
  constructor(private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() { }

}
