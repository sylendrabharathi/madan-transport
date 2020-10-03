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
  addReference(newReference) {
    return this.api.post('Reference', newReference)
  }
  addReferenceList(newReferenceList) {
    return this.api.post('ReferenceList', newReferenceList)
  }
  getReferenceById(id) {
    return this.api.get('Reference/GetReference/?id=' + id);
  }

  getReferenceListById(id) {
    return this.api.get(this.api.formUrl('ReferenceList', id));
  }
  editReference(referenceId, req) {
    return this.api.put(this.api.formUrl('Reference', referenceId), req);
  }
  editReferenceList(referenceId, req) {
    return this.api.put(this.api.formUrl('ReferenceList', referenceId), req);
  }
  deleteReferenceList(referenceId, req) {
    console.log('-->', req, referenceId);

    return this.api.delete(this.api.formUrl('ReferenceList', referenceId), req);
  }
  deleteReference(referenceId, req) {
    return this.api.delete(this.api.formUrl('Reference', referenceId), req)
  }
}
