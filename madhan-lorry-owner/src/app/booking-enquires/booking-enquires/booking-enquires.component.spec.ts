import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingEnquiresComponent } from './booking-enquires.component';

describe('BookingEnquiresComponent', () => {
  let component: BookingEnquiresComponent;
  let fixture: ComponentFixture<BookingEnquiresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingEnquiresComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingEnquiresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
