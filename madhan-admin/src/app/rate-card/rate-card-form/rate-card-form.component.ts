import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rate-card-form',
  templateUrl: './rate-card-form.component.html',
  styleUrls: ['./rate-card-form.component.scss'],
})
export class RateCardFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  submit() {
    this.router.navigate(['rate-card'])
  }

}
