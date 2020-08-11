import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolPodListComponent } from './pol-pod-list.component';

describe('PolPodListComponent', () => {
  let component: PolPodListComponent;
  let fixture: ComponentFixture<PolPodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolPodListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolPodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
