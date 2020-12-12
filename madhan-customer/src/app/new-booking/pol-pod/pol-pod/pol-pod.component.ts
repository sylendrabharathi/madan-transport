import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { NewBookingApiService } from '../../service/api/new-booking-api.service';

@Component({
  selector: 'app-pol-pod',
  templateUrl: './pol-pod.component.html',
  styleUrls: ['./pol-pod.component.scss'],
})
export class PolPodComponent implements OnInit {
  polPods = [];
  // pods = [];
  @Input() type: string;
  @Input() form: any;
  slideOpts = {
    slidesPerView: 2,
    freeMode: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }
  }
  constructor(private api: NewBookingApiService,
    private route: Router,
    private modalCtrl: ModalController,
    private loader: LoaderService) { }

  ngOnInit() { }
  ionViewWillEnter() {
    console.log('this.type', this.type);
    if (this.type === 'pol') {
      this.getPol();
    }
    else
      this.getPod();
    // this.getPolPods();
  }

  getPol() {
    this.loader.createLoader();
    this.api.getPols().subscribe((resp: any) => {
      this.loader.dismissLoader();
      console.log(resp);
      this.polPods = resp || [];
    }, err => {
    });
  }

  getPod() {
    this.loader.createLoader();
    this.api.getPods().subscribe((resp: any) => {
      this.loader.dismissLoader();
      console.log(resp);
      this.polPods = resp || [];
    }, err => {
    });
  }

  dismiss(data) {

    this.modalCtrl.dismiss({ 'data': data });
  }

  openNewPol(type) {
    console.log('this.form', this.form, type);

    // const type = 'pol/pod';
    this.route.navigate(['manage-pol-pod', 'new', type], { state: { formVal: this.form } });
    this.modalCtrl.dismiss();
  }
}
