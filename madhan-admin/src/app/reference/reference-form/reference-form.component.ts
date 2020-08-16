import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReferenceApiService } from '../service/api/reference-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reference-form',
  templateUrl: './reference-form.component.html',
  styleUrls: ['./reference-form.component.scss'],
})
export class ReferenceFormComponent implements OnInit {
  referenceIds: any = [];
  sub: any;
  referenceForm = this.fb.group({
    refOrgId: ['3'],
    refCreatedBy: null,
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  referenceListForm = this.fb.group({
    refOrgId: [3],
    refReferenceId: ['', [Validators.required]],
    refCreatedBy: null,
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  id: number;
  type: string;
  constructor(private fb: FormBuilder,
    private toaster: ToastController,
    private referenceApi: ReferenceApiService,
    private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.aRoute.params.subscribe(param => {
      this.id = Number(param['id']);
      this.type = param['type'];
    });
    console.log('id', 'type', this.id, this.type);
    this.loadEditData(this.id, this.type);
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
      this.referenceApi.addReference(this.referenceForm.value).pipe().subscribe(success => {
        console.log('added success', success);
        this.referenceForm.reset();
        this.router.navigate(['reference']);
        // this.referenceIds = success;
      },
        failure => {
          console.log('failure', failure);
        });

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
      this.referenceApi.addReferenceList(this.referenceListForm.value).pipe().subscribe(success => {
        console.log('added success', success);
        // this.referenceIds = success;
        this.referenceListForm.reset();
        this.router.navigate(['reference']);
      },
        failure => {
          console.log('failure', failure);
        });


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
  loadEditData(id, type) {
    if (type == 'Referece') {
      this.referenceApi.getReferenceById(id).pipe().subscribe(
        (success: any) => {
          console.log('s', success);
          this.referenceForm.get('name').setValue(success[0].name);
          this.referenceForm.get('description').setValue(success[0].description);
          this.referenceForm.updateValueAndValidity();
        },
        failure => {
          console.log('f', failure);
        }
      );
    }
    else {
      this.referenceApi.getReferenceById(id).pipe().subscribe(
        (success: any) => {
          console.log('s', success);
          this.referenceListForm.get('refReferenceId').setValue(success[0].referenceId);
          this.referenceListForm.get('name').setValue(success[0].name);
          this.referenceListForm.get('description').setValue(success[0].description);
          this.referenceForm.updateValueAndValidity();
        },
        failure => {
          console.log('f', failure);
        }
      );
    }
  }

}
