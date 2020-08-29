import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ManageVehicleApiService } from '../services/api/manage-vehicle-api.service';

@Component({
  selector: 'app-manage-vehicle-create',
  templateUrl: './manage-vehicle-create.component.html',
  styleUrls: ['./manage-vehicle-create.component.scss'],
})
export class ManageVehicleCreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private vehicleApi: ManageVehicleApiService) { }

  ngOnInit() { }

}
