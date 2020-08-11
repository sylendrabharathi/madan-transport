import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  cities = [];
  states = [];
  countries = [];
  registrationForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.formRegistration();
    this.getRoleId();
    this.getStates();
    this.getCountries();
    this.getCities();
  }

  formRegistration() {
    this.registrationForm = this.fb.group({
      refOrgId: [3],
      refRoleId: [''],
      refCreatedBy: [''],
      name: ['Bharathi', [Validators.required]],
      gstNo: ['33AACCN4749A2ZT', [Validators.required]],
      gSTDOCUrl: ['we', [Validators.required]],
      pannumber: ['eqwp6325o', [Validators.required]],
      pANDOCUrl: ['we', [Validators.required]],
      legalName: ['NEOLYSI TECHNOLOGIES PRIVATE LIMITED', [Validators.required]],
      address: ['VILLIVAKKAM ', [Validators.required]],
      natureOfBusiness: ['Private Limited Company', [Validators.required]],
      entityType: ['Regular', [Validators.required]],
      registrationType: ['Regular', [Validators.required]],
      deptCodeAndType: ['Regular', [Validators.required]],
      registrationDate: ['10/07/2017', [Validators.required]],
      telePhone: ['8521479630', [Validators.required]],
      mobile: ['9632587410', [Validators.required]],
      email: ['qwerty@l.co', [Validators.required]],
      website: ['www.neo.com', [Validators.required]],
      description: ['Neolusi', [Validators.required]],
      refReferenceListCityId: ['', [Validators.required]],
      refReferenceListStateId: ['2', [Validators.required]],
      refReferenceListCountryId: ['', [Validators.required]],
      address1: ['T', [Validators.required]],
      address2: ['T', [Validators.required]],
      address3: ['T', [Validators.required]],
      address4: ['T', [Validators.required]],

    });
  }

  getRoleId(){
    this.apiService.get('role/GetRolebyName/?name=Customer').subscribe((res: any) => {
      console.log('roleId = ', res);
      if(res && res.length > 0) {
        this.registrationForm.get('refRoleId').setValue(res[0].roleId);
      }
    }, err => {

    })
  }

  getCountries() {
    this.apiService.getCountries().subscribe((res: any) => {
      console.log(res);
      this.countries = res || [];
    }, err => {

    })
  }

  getStates() {
    this.apiService.getStates().subscribe((res: any) => {
      console.log(res);
      this.states = res || [];
    }, err => {

    })
  }

  getCities() {
    this.apiService.getCities().subscribe((res: any) => {
      console.log(res);
      this.cities = res || [];
    }, err => {

    })
  }

  submit() {
    console.log('submit');
    console.log(this.registrationForm.value);
    // if(this.registrationForm.invalid) {
    //   return;
    // }
    const reqObj = JSON.parse(JSON.stringify(this.registrationForm.value));
    reqObj.registrationDate = new Date(reqObj.registrationDate).toISOString();
    reqObj.refReferenceListStateId = 1;
    console.log(JSON.stringify(reqObj));
    this.apiService.post('Customer', reqObj).subscribe((res) => {

    }, err => {

    })
    // this.router.navigate(['login']);
    
    
  }

}
