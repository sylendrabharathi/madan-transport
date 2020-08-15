import { Component, OnInit } from '@angular/core';
import { ConsignerApiService } from '../service/api/consigner-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consigner-list',
  templateUrl: './consigner-list.component.html',
  styleUrls: ['./consigner-list.component.scss'],
})
export class ConsignerListComponent implements OnInit {

  id = 2;
  consigners = [];
  constructor(private api: ConsignerApiService, private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getConsigners();
  }

  getConsigners() {
    this.api.getConsigners(this.id).subscribe((resp: any) => {
      console.log(resp);
      this.consigners = resp || [];
    }, err => {

    })
  }

  createNewConsigner() {
    this.router.navigate(['manage-consigner', 'new']);
  }

}
