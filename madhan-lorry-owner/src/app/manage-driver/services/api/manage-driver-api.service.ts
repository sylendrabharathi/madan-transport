import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageDriverApiService {

  constructor(private api: ApiService) { }

  getDriverDetails(transpoterId) {
    return this.api.get('Driver/GetDriverDetails/?did=&cid=' + transpoterId + '&drivermob=');
  }

}
