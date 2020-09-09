import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class SignUpApiService {

  constructor(private api: ApiService) { }

  getReferceListDatas(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }

  getGstDetails(gstNo) {
    return this.api.getGstData(gstNo);
  }
}
