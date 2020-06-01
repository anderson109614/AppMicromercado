import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoClientePage } from './info-cliente.page';

describe('InfoClientePage', () => {
  let component: InfoClientePage;
  let fixture: ComponentFixture<InfoClientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoClientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoClientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
