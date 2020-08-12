import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenceApiService {

  constructor(private api: ApiService) { }

  getReferenceDetails(name) {
    return this.api.get('Reference/GetRByRName/?name=' + name);
  }

  getReferenceListDetails(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }
}
