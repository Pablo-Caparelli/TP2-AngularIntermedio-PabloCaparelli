import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos';
import { CommonModule } from '@angular/common';
import { DescuentoPipe } from '../../pipes/descuento-pipe';
import { ProductoFormComponent } from '../producto-form/producto-form';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, DescuentoPipe, ProductoFormComponent],
  templateUrl: './lista-productos.html',
  styleUrl: './lista-productos.css',
})
export class ListaProductos implements OnInit {

  products: Producto[] = [];
  loading = true;
  porcentaje_descuento = 10;

  showForm = false;
  productoEditar?: Producto;

  constructor(private productosService: ProductosService) {}

  ngOnInit() {
    this.productosService.getProductos().subscribe(productos => {
      this.products = productos;
      this.loading = false;
    });
  }

  agregar() {
    this.showForm = true;
    this.productoEditar = undefined;
  }

  editar(producto: Producto) {
    this.productoEditar = producto;
    this.showForm = true;
  }

  guardarProducto(productoData: Partial<Producto>) {
    if (this.productoEditar) {
      const actualizado: Producto = { ...this.productoEditar, ...productoData };
      this.productosService.deleteProducto(actualizado.id);
      this.productosService.addProducto(actualizado);
    } else {
      this.productosService.addProducto(productoData);
    }

    this.showForm = false;
  }

  cancelarForm() {
    this.showForm = false;
  }

  eliminar(product_id: number) {
    this.productosService.deleteProducto(product_id);
  }

  limpiarLista() {
    this.productosService.reset();
  }
}
