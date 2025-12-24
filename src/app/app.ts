import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaProductos } from './components/lista-productos/lista-productos';
import { DescuentoPipe } from './pipes/descuento-pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ListaProductos],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('TP2 - Pablo Caparelli');
}
