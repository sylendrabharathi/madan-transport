import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewDriverInOutComponent } from './new-driver-in-out.component';

describe('NewDriverInOutComponent', () => {
  let component: NewDriverInOutComponent;
  let fixture: ComponentFixture<NewDriverInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDriverInOutComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewDriverInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
