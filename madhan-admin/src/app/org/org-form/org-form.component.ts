import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-form',
  templateUrl: './org-form.component.html',
  styleUrls: ['./org-form.component.scss'],
})
export class OrgFormComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }
  submit() {
    this.router.navigate(['org'])
  }


}
