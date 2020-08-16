import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageVehicleApiService {

  constructor(private api: ApiService) { }
}
