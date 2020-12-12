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

  getPolPodById(id) {
    return this.api.get('Polpod/GetPolpod/?polpodid=' + id);
  }

  getRefPolPods() {
    return this.api.get('ReferenceList/GetRLByRName/?name=POL/POD');
  }

  savePolPod(req: any) {
    return this.api.post('PolPod', req);
  }

  updatePolPod(id: any, req: any) {
    return this.api.put('PolPod/' + id, req);
  }

  deletePolPodById(id) {
    return this.api.delete('PolPod/' + id);
  }
  getState(id) {
    return this.api.get(this.api.formUrl('ReferenceList', id));
  }
  getCityBySate(name) {
    return this.api.get('ReferenceList/GetRLByRLDesclike/?name=' + name);
  }
}
