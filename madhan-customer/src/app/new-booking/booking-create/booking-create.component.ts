import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { ConsignerApiService } from 'src/app/manage-consigner/service/api/consigner-api.service';
import { PolPodApiService } from 'src/app/manage-pol-pod/service/api/pol-pod-api.service';
import { ApiService } from 'src/app/service/api/api.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { LocalstorageService } from 'src/app/service/localstorage/localstorage.service';
import { ToastService } from 'src/app/service/toast/toast.service';
import { PolPodComponent } from '../pol-pod/pol-pod/pol-pod.component';
import { NewBookingApiService } from '../service/api/new-booking-api.service';
// import { Slides } from '@ionic/angular';

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
  polAddress = [];
  materials = [];
  consigners = [];
  vehicleTypes: any = [];
  polPods = [];
  locations = [];
  pols = [];
  pods = [];
  rateDetails = [];
  podAddress = [];
  customerId = null;
  userId = null;
  consignerId = null;
  noOfPol = [1];
  noOfPod = [1];
  noOfTrucks = [1];
  truckss = [];
  sourceId;
  destinationId;
  // truckType = '';
  myDate;
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  @ViewChild('slides', { static: true }) slides: IonSlides;


  constructor(private fb: FormBuilder,
    private apiService: ApiService, private ls: LocalstorageService,
    private toastService: ToastService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private bookingService: NewBookingApiService,
    private polPodService: PolPodApiService,
    private consignerApi: ConsignerApiService,
    public modal: ModalController,
    private loader: LoaderService) { }

  ngOnInit() {
    this.customerId = this.ls.getCustomerId();
    this.userId = this.ls.getUserId();
    this.createFG();
    this.getRequiredDetails();
    this.activeRouter.params.subscribe(res => {
      console.log(res);

    })
    this.myDate = new Date();

  }

  ionViewWillEnter() {
    this.slides.slideTo(0);
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

  async popover(type) {
    var pol;
    const modal = await this.modal.create({
      component: PolPodComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        'type': type
      }
    });
    modal.onDidDismiss()
      .then((data: any) => {
        pol = data['data'];
        console.log('pol', pol);
        if (type === 'pol') {
          this.polAddress.push(pol.data.state + ',' + pol.data.city + ',' + pol.data.location);
          this.bookingForm.get('refReferenceListPOLTypeId').setValue(this.polPods[0].referenceListId);
          this.bookingForm.get('polId').setValue(pol.data.polpodid);
        }
        else {
          this.podAddress.push(pol.data.state + ',' + pol.data.city + ',' + pol.data.location);
          this.bookingForm.get('refReferenceListPODTypeId').setValue(this.polPods[1].referenceListId);
          this.bookingForm.get('podId').setValue(pol.data.polpodid);

        }
      });

    return await modal.present();
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
      lRefReferenceListCityId: [null],
      lRefReferenceListStateId: [null],
      lRefReferenceListCountryId: [null],
      lAddress1: ['',],
      lAddress2: ['',],
      lAddress3: ['',],
      lAddress4: ['',],
      refReferenceListPODTypeId: ['', [Validators.required]],
      unLoadingLocation: ['', [Validators.required]],
      estimatedUnloadingTime: ['', [Validators.required]],
      uRefReferenceListCityId: [null],
      uRefReferenceListStateId: [null],
      uRefReferenceListCountryId: [null],
      uAddress1: ['',],
      uAddress2: ['',],
      uAddress3: ['',],
      uAddress4: ['',],
      polId: ['', [Validators.required]],
      podId: ['', [Validators.required]],
      bookingDate: ['', [Validators.required]],
      rateId: ['', [Validators.required]],
      rlRateForId: ['', []],
      // sourceId: ['', []],
      // destinationId: ['', []]
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
    this.loader.createLoader();
    this.bookingService.getLocations().subscribe(res => {
      console.log(res);
      this.loader.dismissLoader();
      this.locations = res as any[];
    }, err => {
      this.loader.dismissLoader();
      console.log(err);

    });
  }

  getPols() {
    this.bookingService.getPols().subscribe(res => {
      console.log('pols', res);
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
    const sourceId = this.sourceId;
    const destinationId = this.destinationId;
    console.log('rlRateForId,', rlRateForId, 'sourceId,', sourceId, 'destinationId,', destinationId);
    if (!!destinationId && !!sourceId)
      this.bookingService.getRateDetails(sourceId, rlRateForId, destinationId).subscribe(res => {
        console.log(res);

        this.rateDetails = res as any[];
        this.bookingForm.get('rateId').setValue(this.rateDetails[0].rateId);
        console.log('this.bookingForm.get(\'rateId\').value()', this.bookingForm.get('rateId').value);

        this.bookingForm.get('rateId').updateValueAndValidity();
      }, err => {
        console.log(err);

      })
  }

  submit() {
    console.log('form', this.bookingForm);

    if (!this.bookingForm.valid) {
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
    for (const loc of this.locations) {
      if (str === 'loadingLocation' && loc.source === this.bookingForm.get(str).value) {
        this.bookingForm.get('rlRateForId').setValue(loc.rlRateForId);
        // this.bookingForm.get('sourceId').setValue(loc.sourceID);
        this.sourceId = loc.sourceID;
        break;
      }

      if (str === 'unLoadingLocation' && loc.destination === this.bookingForm.get(str).value) {
        // this.bookingForm.get('destinationId').setValue(loc.destinationID);
        this.destinationId = loc.destinationID;
        break;
      }

    }
    this.getRateDetails();
    this.bookingForm.get('bookingDate').setValue(new Date().toISOString());
    this.bookingForm.get('bookingDate').updateValueAndValidity();
  }
  increaseCount(data) {
    if (data === 'pol')
      this.noOfPol.push(1);
    else if (data === 'pod')
      this.noOfPod.push(1);
    else
      this.noOfTrucks.push(1);
  }
  trucksLoader(data) {
    console.log('this.truckType', data.detail.value);
    this.bookingService.getVehicleByType(data.detail.value).subscribe(success => {
      console.log('suc', success);
      this.vehicleTypes = success
    },
      failure => {
        console.log('fail', failure);

      });
  }
  getSelectedTrucks(data) {
    console.log('data', data);

    this.truckss.push(data.detail.value);
  }
  decreaseCount(data) {
    if (data === 'pol')
      this.noOfPol.pop();
    else if (data === 'pod')
      this.noOfPod.pop();
    else
      this.noOfTrucks.pop();
  }
  goToStepTwo() {
    console.log('inside');
    setTimeout(() => {
      this.slides.slideNext();
    }, 1000)

  }
}
