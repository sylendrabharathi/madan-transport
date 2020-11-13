import { Component, OnInit } from '@angular/core';
import { PolPodApiService } from '../service/api/pol-pod-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/service/Loader/loader.service';
import { AlertServiceService } from 'src/app/service/alert/alert-service.service';

@Component({
  selector: 'app-pol-pod-list',
  templateUrl: './pol-pod-list.component.html',
  styleUrls: ['./pol-pod-list.component.scss'],
})
export class PolPodListComponent implements OnInit {

  polPods = [];
  constructor(private api: PolPodApiService,
    private router: Router,
    private loader: LoaderService,
    private alert: AlertServiceService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getPolPods();
  }

  getPolPods() {
    this.loader.createLoader();
    this.api.getPolPods().subscribe((resp: any) => {
      this.loader.dismissLoader();
      console.log(resp);
      this.polPods = resp || [];

    }, err => {

    })
  }

  createPolPod() {
    this.router.navigate(['manage-pol-pod', 'new']);
  }

  editPolPod(item) {
    console.log('edit = ', item);
    this.router.navigate(['manage-pol-pod', item.polpodid, 'edit']);

  }

  deletePolPod(item) {
    this.alert.alertPromt().then(data => {
      if (Boolean(data)) {
        console.log('delete = ', item);
        // this.loader.createLoader();
        this.api.deletePolPodById(item.polpodid).subscribe(res => {
          // this.loader.dismissLoader();
          console.log(res);
          this.getPolPods();
        }, err => {
          console.log(err);
          this.getPolPods();
        })
      }
    });
    this.loader.dismissLoader();
  }
}
