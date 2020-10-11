import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/service/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeApiService {

  constructor(private api: ApiService) { }

  getRoleId() {
    return this.api.get('role/GetRolebyName/?name=Customer')
  }
  getEmployeeById(id) {
    return this.api.get('employee/GetEmployeeDetails/?id=' + id);
  }
  deleteEmployee(id, req) {
    return this.api.delete(this.api.formUrl('employee', id), req);
  }
  getReferenceList(name) {
    return this.api.get('ReferenceList/GetRLByRName/?name=' + name);
  }
  addEmployee(req) {
    return this.api.post('employee', req);
  }
  editEmployee(empId, req) {
    return this.api.put(this.api.formUrl('employee', empId), req);
  }
}
