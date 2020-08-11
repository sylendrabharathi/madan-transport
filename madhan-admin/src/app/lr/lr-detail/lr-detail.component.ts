import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lr-detail',
  templateUrl: './lr-detail.component.html',
  styleUrls: ['./lr-detail.component.scss'],
})
export class LrDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  submit() {
    this.router.navigate(['lr'])
  }


}
