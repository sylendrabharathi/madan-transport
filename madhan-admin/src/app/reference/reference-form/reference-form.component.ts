import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReferenceApiService } from '../service/api/reference-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/service/toast/toast.service';
import { LoaderService } from 'src/app/service/Loader/loader.service';

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
    private toaster: ToastService,
    private referenceApi: ReferenceApiService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private loader: LoaderService) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.getReferenceIds('');
    this.sub = this.aRoute.params.subscribe(param => {
      this.editId = Number(param['id']);
      if (this.editId > -1) {
        this.type = param['type'];
        this.loadEditData(this.editId, this.type);
      }
    });
    console.log('id', 'type', this.editId, this.type);
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
      this.toaster.danger('Enter all values');
      this.referenceForm.markAllAsTouched();
      this.referenceForm.updateValueAndValidity();
    }
  }
  saveReference(req) {
    req.refCreatedBy = 4;
    req.refOrgId = 3;
    this.loader.createLoader();
    this.referenceApi.addReference(req).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('added success', success);
      if (success[0].status == 1) {
        this.toaster.success(success[0].msg);
        this.referenceForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.toaster.danger(success[0].msg);
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
        this.toaster.danger(failure[0].msg);
      });
  }
  editReference(req) {
    req.isActive = this.referenceData.isActive
    req.refModifiedBy = 4;
    req.referenceId = this.editId;
    this.loader.createLoader();
    this.referenceApi.editReference(this.editId, req).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('added success', success);
      if (success[0].status == 2) {
        this.toaster.success(success[0].msg);
        this.referenceForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.toaster.danger(success[0].msg);
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
        this.toaster.danger(failure[0].msg);
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
      this.toaster.danger('Enter all values');
      this.referenceListForm.markAllAsTouched();
      this.referenceListForm.updateValueAndValidity();
    }
  }
  saveReferenceList(req) {
    req.refCreatedBy = 1;
    this.loader.createLoader();
    this.referenceApi.addReferenceList(req).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('added success', success);
      if (success[0].status == 1) {
        this.toaster.success(success[0].msg);
        this.referenceListForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.toaster.danger(success[0].msg);
    },
      failure => {
        this.loader.dismissLoader();
        console.log('failure', failure);
      });
  }
  editReferenceList(req) {
    req.referenceListId = this.editId;
    req.isActive = this.referenceListData.isActive != null ? this.referenceListData.isActive : true;
    req.refModifiedBy = 1;
    this.loader.createLoader();
    this.referenceApi.editReferenceList(this.editId, req).pipe().subscribe(success => {
      this.loader.dismissLoader();
      console.log('added success', success);
      if (success[0].status == 2) {
        this.toaster.success(success[0].msg);
        this.referenceListForm.reset();
        this.router.navigate(['reference']);
        return;
      }
      this.toaster.danger(success[0].msg);
    },
      failure => {
        this.loader.dismissLoader();
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
    this.loader.createLoader();
    this.referenceApi.getReferenceById(id).pipe().subscribe(
      (success: any) => {
        this.loader.dismissLoader();
        console.log('s', success);
        this.referenceData = success[0];
        this.referenceForm.get('name').setValue(success[0].name);
        this.referenceForm.get('description').setValue(success[0].description);
        this.referenceForm.updateValueAndValidity();
      },
      failure => {
        this.loader.dismissLoader();
        console.log('f', failure);
      });
  }

  loadReferenceList(id) {
    this.loader.createLoader();
    this.referenceApi.getReferenceListById(id).pipe().subscribe(
      (success: any) => {
        this.loader.dismissLoader();
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
        this.loader.dismissLoader();
        console.log('f', failure);
      });
  }


}
