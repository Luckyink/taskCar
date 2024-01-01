import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AddCarPage } from './add-car.page';

describe('AddInvoicePage', () => {
  let component: AddCarPage;
  let fixture: ComponentFixture<AddCarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
