import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriverInOutComponent } from './driver-in-out.component';

describe('DriverInOutComponent', () => {
  let component: DriverInOutComponent;
  let fixture: ComponentFixture<DriverInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverInOutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriverInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
