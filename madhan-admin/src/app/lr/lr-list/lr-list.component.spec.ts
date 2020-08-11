import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LrListComponent } from './lr-list.component';

describe('LrListComponent', () => {
  let component: LrListComponent;
  let fixture: ComponentFixture<LrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LrListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
