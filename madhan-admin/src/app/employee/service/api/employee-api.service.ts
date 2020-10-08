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
  getEmployeeById() {
    return this.api.get('employee/GetEmployeeDetails/?id=');
  }
}
