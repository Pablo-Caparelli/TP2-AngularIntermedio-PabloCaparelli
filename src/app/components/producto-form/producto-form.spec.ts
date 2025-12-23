import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoFormComponent } from './producto-form';

describe('ProductoFormComponent', () => {
  let component: ProductoFormComponent;
  let fixture: ComponentFixture<ProductoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoFormComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
