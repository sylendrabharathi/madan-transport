import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReferenceApiService } from '../service/api/reference-api.service';

@Component({
  selector: 'app-reference-form',
  templateUrl: './reference-form.component.html',
  styleUrls: ['./reference-form.component.scss'],
})
export class ReferenceFormComponent implements OnInit {
  referenceIds: any = [];
  referenceForm = this.fb.group({
    refOrgId: ['3'],
    refCreatedBy: ['1'],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  referenceListForm = this.fb.group({
    refOrgId: ['3'],
    refReferenceId: ['', [Validators.required]],
    refCreatedBy: ['1'],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private toaster: ToastController,
    private referenceApi: ReferenceApiService) { }

  ngOnInit() {
    this.getReferenceIds('');
  }
  getReferenceIds(rateType) {
    this.referenceApi.getReferenceDetails(rateType).pipe().subscribe(success => {
      console.log('success', success);
      this.referenceIds = success;
    },
      failure => {
        console.log('failure', failure);
      });
  }
  async onReferenceCreation() {
    if (this.referenceForm.valid) {
      console.log('valid', this.referenceForm.value);
      this.referenceForm.reset();
    }
    else {
      const toast = await this.toaster.create({
        header: 'Error',
        message: 'Enter all values',
        position: 'top',
        duration: 300,
        mode: 'ios',
        translucent: true
      });
      toast.present();
    }
  }
  async onReferenceListCreation() {
    if (this.referenceListForm.valid) {
      console.log('valid', this.referenceListForm.value);
      this.referenceListForm.reset();
    }
    else {
      const toast = await this.toaster.create({
        header: 'Error',
        message: 'Enter all values',
        position: 'top',
        duration: 300,
        mode: 'ios',
        translucent: true
      });
      toast.present();
    }
  }

}
