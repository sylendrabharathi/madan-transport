import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-in-out',
  templateUrl: './driver-in-out.component.html',
  styleUrls: ['./driver-in-out.component.scss'],
})
export class DriverInOutComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  newDriverInOut() {
    this.router.navigate(['driver-in-out', 'create']);
  }

}
