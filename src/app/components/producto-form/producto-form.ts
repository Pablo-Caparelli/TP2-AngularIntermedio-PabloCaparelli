import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';


@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrls: ['./producto-form.css']
})
export class ProductoFormComponent implements OnChanges {
  @Input() producto?: Producto; // Para editar si se pasa
  @Output() guardar = new EventEmitter<Partial<Producto>>();
  @Output() cancelar = new EventEmitter<void>();

  productoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnChanges() {
    if (this.producto) {
      this.productoForm.patchValue({
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
      });
    }
  }

  onSubmit() {
    if (this.productoForm.valid) {
      this.guardar.emit(this.productoForm.value);
      this.productoForm.reset()
    }
  }

  onCancelar() {
    this.cancelar.emit();
    this.productoForm.reset();
  }
}



