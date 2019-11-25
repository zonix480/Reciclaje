import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeleteRecPage } from './delete-rec.page';

describe('DeleteRecPage', () => {
  let component: DeleteRecPage;
  let fixture: ComponentFixture<DeleteRecPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRecPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteRecPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
