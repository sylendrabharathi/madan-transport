import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController) { }

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
    this.api.getPols().subscribe((resp: any) => {
      console.log(resp);
      this.polPods = resp || [];
    }, err => {
    });
  }

  getPod() {
    this.api.getPods().subscribe((resp: any) => {
      console.log(resp);
      this.polPods = resp || [];
    }, err => {
    });
  }

  dismiss(data) {

    this.modalCtrl.dismiss({ 'data': data });
  }

  openNewPol() {
    this.route.navigate(['manage-pol-pod', 'new'])
  }
}
