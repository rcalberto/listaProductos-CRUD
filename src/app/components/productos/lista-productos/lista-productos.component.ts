import { Producto } from './../../../models/producto';
import { Component, Input, OnInit } from '@angular/core';
import { ServiciosService } from '../../../services/servicios.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css'],
})
export class ListaProductosComponent implements OnInit {
  constructor(public productoServicio: ServiciosService) {}

  estado: string = '';
  ngOnInit(): void {
    this.getPorductos();
  }
  productos: Producto[] = [];

  getPorductos() {
    this.productoServicio.getProductos().subscribe((data) => {
      this.productos = [];
      data.forEach((element: any) => {
        this.productos.push({
          $key: element.payload.doc.id,

          ...element.payload.doc.data(),
        });
      });
      console.log(this.productos);
    });
  }
  onEdit(producto: Producto) {
    if (producto.$key != null) {
      this.estado = 'Editar';
      this.productoServicio.estadoServicio = this.estado;

      this.productoServicio.seleccionarProducto = Object.assign({}, producto);
    } else {
      console.log('key error');
    }
  }
  onDelete($key: string) {
    if ($key != null) {
      if (confirm('Esta seguro de eliminar elproducto?')) {
        this.productoServicio.deleteProducto($key).then(() => {
          console.log('empleado eliminado');
        });
      }
    } else {
      alert('error de key');
    }
  }
}
