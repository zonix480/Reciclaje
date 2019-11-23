import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateRecPage } from './create-rec.page';

describe('CreateRecPage', () => {
  let component: CreateRecPage;
  let fixture: ComponentFixture<CreateRecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRecPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
