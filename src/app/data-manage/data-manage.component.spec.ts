import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataManageComponent } from './data-manage.component';

describe('DataManageComponent', () => {
  let component: DataManageComponent;
  let fixture: ComponentFixture<DataManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataManageComponent]
    });
    fixture = TestBed.createComponent(DataManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
