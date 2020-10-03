import { Component, OnInit } from '@angular/core';
import { PolPodApiService } from '../service/api/pol-pod-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pol-pod-list',
  templateUrl: './pol-pod-list.component.html',
  styleUrls: ['./pol-pod-list.component.scss'],
})
export class PolPodListComponent implements OnInit {

  polPods = [];
  constructor(private api: PolPodApiService, private router: Router) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getPolPods();
  }

  getPolPods() {
    this.api.getPolPods().subscribe((resp: any) => {
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
    console.log('delete = ', item);
    this.api.deletePolPodById(item.polpodid).subscribe(res => {
      console.log(res);
      this.getPolPods();
    }, err => {
      console.log(err);
      this.getPolPods();
    })
  }
}
