import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsignerApiService } from 'src/app/manage-consigner/service/api/consigner-api.service';
import { PolPodApiService } from 'src/app/manage-pol-pod/service/api/pol-pod-api.service';
import { ApiService } from 'src/app/service/api/api.service';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { NewBookingApiService } from '../service/api/new-booking-api.service';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss'],
})


export class BookingCreateComponent implements OnInit {

  bookingForm: FormGroup;
  cities = [];
  states = [];
  countries = [];
  
  materials = [];
  consigners = [];
  vehicleTypes = [];
  polPods = [];
  locations = [];
  pols = [];
  pods = [];
  rateDetails = [];

  customerId = null;
  userId = null;
  consignerId = null;

  constructor(private fb: FormBuilder,
    private apiService: ApiService, private ls: LocalstorageService,
    private toastService: ToastService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private bookingService: NewBookingApiService,
    private polPodService: PolPodApiService,
    private consignerApi: ConsignerApiService) { }

  ngOnInit() { 
    this.customerId = this.ls.getCustomerId();
    this.userId = this.ls.getUserId();
    this.createFG();
    this.getRequiredDetails();

  }

  ionViewWillEnter() {
  }

  getRequiredDetails() {
    this.getStates();
    this.getCountries();
    this.getCities();
    this.getMaterials();
    this.getConsigners();
    this.getVehicleTypes();
    this.getLocations();
    this.getPods();
    this.getPols();
    this.getPolPods();
    this.getRateDetails();

  }


  createFG() {
    this.bookingForm = this.fb.group({
      refOrgId: [3, []],
      refCreatedBy: [this.userId, []],
      refCustomerId: [this.customerId, []],
      refConsignerID: ['', [Validators.required]],
      value: [null, []],
      refMaterialRefListId: ['', [Validators.required]],
      totalQty: ['', [Validators.required]],
      refReferenceListVehicleTypeId: ['', [Validators.required]],
      refReferenceListPOLTypeId: ['', [Validators.required]],
      loadingLocation: ['', [Validators.required]],
      estimatedLoadingTime: ['', [Validators.required]],
      lRefReferenceListCityId: ['', [Validators.required]],
      lRefReferenceListStateId: ['', [Validators.required]],
      lRefReferenceListCountryId: ['', [Validators.required]],
      lAddress1: ['', [Validators.required]],
      lAddress2: ['', [Validators.required]],
      lAddress3: ['', [Validators.required]],
      lAddress4: ['', [Validators.required]],
      refReferenceListPODTypeId: ['', [Validators.required]],
      unLoadingLocation: ['', [Validators.required]],
      estimatedUnloadingTime: ['', [Validators.required]],
      uRefReferenceListCityId: ['', [Validators.required]],
      uRefReferenceListStateId: ['', [Validators.required]],
      uRefReferenceListCountryId: ['', [Validators.required]],
      uAddress1: ['', [Validators.required]],
      uAddress2: ['', [Validators.required]],
      uAddress3: ['', [Validators.required]],
      uAddress4: ['', [Validators.required]],
      polId: ['', [Validators.required]],
      podId: ['', [Validators.required]],
      bookingDate: ['', [Validators.required]],
      rateId: ['', [Validators.required]],
      rlRateForId: ['', []],
      sourceId: ['', []],
      destinationId: ['', []]
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

    });
  }

  getMaterials() {
    this.bookingService.getMaterials().subscribe(res => {
      console.log(res);
      this.materials = res as any[];
      
    }, err => {
      console.log(err);
      
    })
  }

  getConsigners() {
    this.consignerApi.getConsigners(this.customerId).subscribe((res: any[]) => {
      console.log(res);
      this.consigners = res;
    }, err => {
      console.log(err);
      
    });
  }

  getVehicleTypes() {
    this.bookingService.getVehicleTypes().subscribe((res) => {
      console.log(res);
      this.vehicleTypes = res as any[];
    }, err => {
      console.log(err);
      
    });
  }

  getPolPods() {
    this.polPodService.getRefPolPods().subscribe(res => {
      console.log(res);
      this.polPods = res as any[];
    }, err => {
      console.log(err);
      
    });
  }

  getLocations() {
    this.bookingService.getLocations().subscribe(res => {
      console.log(res);
      this.locations = res as any[];
    }, err => {
      console.log(err);
      
    });
  }

  getPols() {
    this.bookingService.getPols().subscribe(res => {
      console.log(res);
      this.pols = res as any[];
    }, err => {
      console.log(err);
      
    });
  }

  getPods() {
    this.bookingService.getPods().subscribe(res => {
      console.log(res);
      this.pods = res as any[];
    }, err => {
      console.log(err);
      
    });
  }

  getRateDetails() {

    const rlRateForId = this.bookingForm.get('rlRateForId').value;
    const sourceId = this.bookingForm.get('sourceId').value;
    const destinationId = this.bookingForm.get('destinationId').value;
    this.bookingService.getRateDetails(sourceId, rlRateForId, destinationId).subscribe(res => {
      console.log(res);
      
      this.rateDetails = res as any[];
    }, err => {
      console.log(err);
      
    })
  }

  submit() {
    if(!this.bookingForm.valid) {
      this.toastService.danger('Please fill all the fields');
      return;
    }
    console.log(this.bookingForm.value);
    const req = JSON.parse(JSON.stringify(this.bookingForm.value));
    req.refCreatedBy = parseInt(req.refCreatedBy.toString());
    req.refCustomerId = parseInt(req.refCustomerId.toString());
    req.estimatedLoadingTime = new Date(req.estimatedLoadingTime).toISOString().split('.')[0];
    req.estimatedUnloadingTime = new Date(req.estimatedUnloadingTime).toISOString().split('.')[0];
    req.bookingDate = new Date(req.bookingDate).toISOString().split('.')[0];
    console.log(req);
    
    this.bookingService.save(req).subscribe(res => {
      console.log(res);
      this.toastService.success('Bookings created successfully');
      this.bookingForm.reset();
      
    }, err => {
      console.log(err);
      
    })
    
  }

  changeLocations($event, str) {
    console.log($event, str);
    for(const loc of this.locations) {
      if(str === 'loadingLocation' && loc.source === this.bookingForm.get(str).value) {
        this.bookingForm.get('rlRateForId').setValue(loc.rlRateForId);
        this.bookingForm.get('sourceId').setValue(loc.sourceID);
        break;
      }

      if(str === 'unLoadingLocation' && loc.destination === this.bookingForm.get(str).value) {
        this.bookingForm.get('destinationId').setValue(loc.destinationID);
        break;
      }
      
    }
  this.getRateDetails();
    
  }

}
