import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageDriverApiService {

  constructor(private api: ApiService) { }

  getDriverDetails(transpoterId) {
    return this.api.get('Driver/GetDriverDetails?cid=' + transpoterId);
  }
  getDriver(driverId) {
    return this.api.get(this.api.formUrl('Driver', driverId));
  }
  saveDriver(driverDetails) {
    return this.api.post('Driver/', driverDetails);
  }
  editDriver(driverDetails, driverId) {
    return this.api.put(this.api.formUrl('Driver', driverId), driverDetails);
  }
  deleteDriver(driverDetails, driverId) {
    return this.api.delete(this.api.formUrl('Driver', driverId), driverDetails);
  }
  addUser(userReq) {
    return this.api.post('User/', userReq);
  }
  editUser(userId, userDetails) {
    return this.api.put(this.api.formUrl('User', userId), userDetails);
  }
  getUser(userId) {
    return this.api.get(this.api.formUrl('User', userId));
  }
  getRole(user) {
    return this.api.get('role/GetRolebyName/?name=' + user)
  }
}
