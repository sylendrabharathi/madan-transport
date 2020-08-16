import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-vehicle-list',
  templateUrl: './manage-vehicle-list.component.html',
  styleUrls: ['./manage-vehicle-list.component.scss'],
})
export class ManageVehicleListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  createVehicle() {
    this.router.navigate(['manage-vehicle', 'create']);
  }

}
