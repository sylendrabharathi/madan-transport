import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingReciptPage } from './booking-recipt.page';

describe('BookingReciptPage', () => {
  let component: BookingReciptPage;
  let fixture: ComponentFixture<BookingReciptPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingReciptPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingReciptPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
