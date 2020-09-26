import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PolPodApiService {

  constructor(private api: ApiService) { }

  getPolPods() {
    return this.api.get('Polpod/GetPolpod');
  }

  getRefPolPods() {
    return this.api.get('ReferenceList/GetRLByRName/?name=POL/POD');
  }

  savePolPod(req: any) {
    return this.api.post('PolPod', req);
  }
}
