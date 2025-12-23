//Contrato de tipo de como es el tipado de un Producto
//en la aplicación

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  fechaAlta: string; //Formato ISO
}
