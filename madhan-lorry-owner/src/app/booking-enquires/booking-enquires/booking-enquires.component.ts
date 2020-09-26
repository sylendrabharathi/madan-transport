import { Component, OnInit } from '@angular/core';
import { BookingEnquiresApiService } from '../services/api/booking-enquires-api.service';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-booking-enquires',
  templateUrl: './booking-enquires.component.html',
  styleUrls: ['./booking-enquires.component.scss'],
})
export class BookingEnquiresComponent implements OnInit {
  bookingEnquires: any = [];
  responseJson = {
    VehicleBookingEnqResponseId: 0,
    FeedBack: '',
    RefModifiedBy: 0
  };
  transpoterId = 0;
  constructor(private benqApi: BookingEnquiresApiService,
    private ls: LocalStorageService,
    public alertController: AlertController) { }

  ngOnInit() { }
  ionViewWillEnter() {
    this.transpoterId = Number(this.ls.getCustomerId());
    this.getEnqData(this.transpoterId);
    this.responseJson.RefModifiedBy = this.transpoterId;
  }
  getEnqData(ownerId) {
    this.benqApi.getAllBookingEnq(ownerId).subscribe(success => {
      console.log('success', success);
      this.bookingEnquires = success;
    },
      failure => {
        console.log('failure', failure);

      });
  }

  async presentAlertPrompt(enquireRosponseId) {
    this.responseJson.VehicleBookingEnqResponseId = enquireRosponseId;
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      animated: true,
      // backdrop-dismiss:true,
      header: 'Confirmation ',
      message: 'Feedback :',
      inputs: [
        {
          name: 'Feedback',
          type: 'text',
          placeholder: 'Ready to accept'

        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (alertData) => {

          }
        }, {
          text: 'Ok',
          handler: (alertData) => {
            this.accepted(alertData.Feedback);

          }
        }
      ]
    });

    await alert.present();

  }
  accepted(feedback) {
    this.responseJson.FeedBack = 'Accepted ' + feedback;
    console.log('this.responseJson', this.responseJson);

    this.benqApi.submitResponse(this.responseJson).subscribe(success => {
      console.log('success', success);
    }, failure => {
      console.log('failure', failure);
    });
  }
  reject(enquireRosponseId) {
    this.responseJson.VehicleBookingEnqResponseId = enquireRosponseId;
    this.responseJson.FeedBack = 'Rejected';
    this.benqApi.submitResponse(this.responseJson).subscribe(success => {
      console.log('success', success);
    }, failure => {
      console.log('failure', failure);
    });

  }
}
