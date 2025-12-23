import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  private STORAGE_KEY = 'productos';

  // Lista inicial de productos
  private inicial: Producto[] = [
    {
      id: 1,
      nombre: 'Camiseta',
      descripcion: '100% algodon',
      precio: 2500,
      fechaAlta: new Date(2025, 0, 10).toISOString(),
    },
    {
      id: 2,
      nombre: 'Pantalón',
      descripcion: '100% algodon',
      precio: 3500,
      fechaAlta: new Date(2025, 1, 20).toISOString(),
    },
    {
      id: 3,
      nombre: 'Zapatillas',
      descripcion: '100% originales',
      precio: 4500,
      fechaAlta: new Date(2025, 3, 30).toISOString(),
    },
  ];

  // Estado global de productos
  private productosSubject = new BehaviorSubject<Producto[]>(this.cargarDesdeStorage());

  // ID autoincremental
  private nextId = 1;

  constructor() {}

  private cargarDesdeStorage(): Producto[] {
    const data = localStorage.getItem(this.STORAGE_KEY);

    if (data) {
      const productos = JSON.parse(data) as Producto[];
      this.nextId = Math.max(...productos.map(p => p.id)) + 1;
      return productos;
    }

    this.nextId = Math.max(...this.inicial.map(p => p.id)) + 1;
    return [...this.inicial];
  }

  private guardarEnStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.productosSubject.getValue()));
  }

  getProductos(): Observable<Producto[]> {
    return this.productosSubject.asObservable();
  }

  addProducto(producto_parcial: Partial<Producto>) {
    const productos_actuales = this.productosSubject.getValue();

    const new_producto: Producto = {
      id: this.nextId++,
      nombre: producto_parcial.nombre || '',
      precio: producto_parcial.precio ?? 0,
      descripcion: producto_parcial.descripcion || '',
      fechaAlta: producto_parcial.fechaAlta || new Date().toISOString(),
    };

    const nueva_lista = [...productos_actuales, new_producto];
    this.productosSubject.next(nueva_lista);
    this.guardarEnStorage();
  }

  deleteProducto(product_id: number) {
    const productos_filtrados = this.productosSubject
      .getValue()
      .filter((product) => product.id !== product_id);

    this.productosSubject.next(productos_filtrados);
    this.guardarEnStorage();
  }

  reset() {
    this.productosSubject.next([...this.inicial]);
    this.nextId = Math.max(...this.inicial.map(p => p.id)) + 1;
    this.guardarEnStorage();
  }
}
