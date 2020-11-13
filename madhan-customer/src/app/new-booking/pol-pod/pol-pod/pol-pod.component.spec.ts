import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PolPodComponent } from './pol-pod.component';

describe('PolPodComponent', () => {
  let component: PolPodComponent;
  let fixture: ComponentFixture<PolPodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolPodComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PolPodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
