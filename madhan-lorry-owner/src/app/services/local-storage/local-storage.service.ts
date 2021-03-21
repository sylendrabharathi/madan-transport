import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private userId = 'userId';
  private driverId = 'driverId';
  private customerId = 'customerId';
  private userIns = 'userIns';
  private myLanguage = 'my_language';
  private vehicleId = 'vehicleId';

  constructor() { }

  setUserId(userId) {
    localStorage.setItem(this.userId, userId);
  }

  getUserId() {
    return localStorage.getItem(this.userId);
  }

  setCustomerId(customerId) {
    localStorage.setItem(this.customerId, customerId);
  }

  getCustomerId() {
    return localStorage.getItem(this.customerId);
  }

  setUserIns(userIns) {
    localStorage.setItem(this.userIns, userIns);
  }

  getUserIns() {
    return localStorage.getItem(this.userIns);
  }

  setmyLanguage(val) {
    localStorage.setItem(this.myLanguage, val);
  }

  getMyLanguage() {
    return localStorage.getItem(this.myLanguage);
  }
  setmydriverId(val) {
    localStorage.setItem(this.driverId, val);
  }

  getMydriverId() {
    return localStorage.getItem(this.driverId);
  }
  setmyVehicleId(val) {
    localStorage.setItem(this.vehicleId, val);
  }
  getmyVehicleId() {
    return localStorage.getItem(this.vehicleId);
  }
}
