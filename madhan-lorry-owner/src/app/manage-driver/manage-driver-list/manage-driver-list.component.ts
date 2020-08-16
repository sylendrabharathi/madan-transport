import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-driver-list',
  templateUrl: './manage-driver-list.component.html',
  styleUrls: ['./manage-driver-list.component.scss'],
})
export class ManageDriverListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  createDriver() {
    this.router.navigate(['manage-driver', 'create']);
  }

}
