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
  referenceData: any = [];
  referenceListData: any = [];
  sub: any;
  referenceForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  referenceListForm = this.fb.group({
    refOrgId: [3],
    refReferenceId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]]
  });
  editId: number = -1;
  type: string;
  constructor(private fb: FormBuilder,
    private toaster: ToastController,
    private referenceApi: ReferenceApiService,
    private router: Router,
    private aRoute: ActivatedRoute) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.sub = this.aRoute.params.subscribe(param => {
      this.editId = Number(param['id']);
      this.type = param['type'];
    });
    console.log('id', 'type', this.editId, this.type);
    this.getReferenceIds('');
    this.loadEditData(this.editId, this.type);
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
  onReferenceCreation() {
    if (this.referenceForm.valid) {
      let req: any = this.referenceForm.value;
      if (this.editId > -1) {
        this.editReference(req);
        return;
      }
      this.saveReference(req);
    }
    else {
      this.Toaster('Enter all values', 'danger');
      this.referenceForm.markAllAsTouched();
      this.referenceForm.updateValueAndValidity();
    }
  }
  saveReference(req) {
    req.refCreatedBy = 4;
    req.refOrgId = 3;
    this.referenceApi.addReference(req).pipe().subscribe(success => {
      console.log('added success', success);
      if (success[0].status == 1) {
        this.Toaster(success[0].msg, 'success');
        this.referenceForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
        this.Toaster(failure[0].msg, 'danger');
      });
  }
  editReference(req) {
    req.isActive = this.referenceData.isActive
    req.refModifiedBy = 4;
    req.referenceId = this.editId;
    this.referenceApi.editReference(this.editId, req).pipe().subscribe(success => {
      console.log('added success', success);
      if (success[0].status == 2) {
        this.Toaster(success[0].msg, 'success');
        this.referenceForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
        this.Toaster(failure[0].msg, 'danger');
      });
  }
  onReferenceListCreation() {
    if (this.referenceListForm.valid) {
      let req: any = this.referenceListForm.value;
      console.log('valid', this.referenceListForm.value);
      if (this.editId > -1) {
        this.editReferenceList(req);
        return;
      }
      this.saveReferenceList(req);

    }
    else {
      this.Toaster('Enter all values', 'danger');
      this.referenceListForm.markAllAsTouched();
      this.referenceListForm.updateValueAndValidity();
    }
  }
  saveReferenceList(req) {
    req.refCreatedBy = 1;
    this.referenceApi.addReferenceList(req).pipe().subscribe(success => {
      console.log('added success', success);
      if (success[0].status == 1) {
        this.Toaster(success[0].msg, 'success');
        this.referenceListForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
      });
  }
  editReferenceList(req) {
    req.referenceListId = this.editId;
    req.isActive = this.referenceListData.isActive != null ? this.referenceListData.isActive : true;
    req.refModifiedBy = 1;
    this.referenceApi.editReferenceList(this.editId, req).pipe().subscribe(success => {
      console.log('added success', success);
      if (success[0].status == 2) {
        this.Toaster(success[0].msg, 'success');
        this.referenceListForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.Toaster(success[0].msg, 'danger');
    },
      failure => {
        console.log('failure', failure);
      });
  }

  loadEditData(id, type) {
    console.log(id, type);

    if (type == 'Referece') {
      this.loadReference(id);
      return;
    }
    this.loadReferenceList(id);
  }

  loadReference(id) {
    this.referenceApi.getReferenceById(id).pipe().subscribe(
      (success: any) => {
        console.log('s', success);
        this.referenceData = success[0];
        this.referenceForm.get('name').setValue(success[0].name);
        this.referenceForm.get('description').setValue(success[0].description);
        this.referenceForm.updateValueAndValidity();
      },
      failure => {
        console.log('f', failure);
      });
  }

  loadReferenceList(id) {
    this.referenceApi.getReferenceListById(id).pipe().subscribe(
      (success: any) => {
        console.log('s', success);
        this.referenceListData = success[0];
        this.referenceListForm.get('refReferenceId').setValue(success[0].refReferenceId);
        this.referenceListForm.get('name').setValue(success[0].name);
        this.referenceListForm.get('description').setValue(success[0].description);
        this.referenceListForm.get('refReferenceId').updateValueAndValidity();
        this.referenceListForm.get('name').updateValueAndValidity();
        this.referenceListForm.get('description').updateValueAndValidity();
        this.referenceForm.updateValueAndValidity();
      },
      failure => {
        console.log('f', failure);
      });
  }

  async Toaster(message, color) {
    console.log('inside-->');
    let toast = await this.toaster.create({
      message: message,
      duration: 2000,
      position: 'top',
      animated: true,
      color: color,
      mode: "ios"
    });
    toast.present();
  }

}
