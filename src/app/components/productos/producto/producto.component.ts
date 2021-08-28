import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Producto } from '../../../models/producto';
import { ServiciosService } from '../../../services/servicios.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  estado: string = '';

  constructor(public productoServicio: ServiciosService) {}

  ngOnInit(): void {
    this.getPorductos();
  }
  producto: Producto[] = [];

  getPorductos() {
    this.productoServicio.getProductos().subscribe((data) => {
      this.producto = [];
      data.forEach((element: any) => {
        this.producto.push({
          $key: element.payload.doc.id,

          ...element.payload.doc.data(),
        });
      });
      console.log(this.producto);
    });
  }
  estadoBoton(productoForm?: NgForm) {
    if (productoForm == null) {
      this.estado = 'Agregar';
    } else {
      this.estado = 'Editar';
    }
    this.productoServicio.estadoServicio = this.estado;
  }
  onSubmit(productoForm: NgForm) {
    if (productoForm.value.$key == null) {
      this.productoServicio.agregarProducto(productoForm.value).then((data) => {
        console.log(data);
      });
    } else {
      this.productoServicio.editarProducto(productoForm.value);
    }

    this.resetForm(productoForm);
  }

  onEdit(productoForm: NgForm) {
    this.productoServicio.editarProducto(productoForm.value);
  }

  resetForm(productoForm?: NgForm) {
    if (productoForm != null) {
      productoForm.reset();
      this.productoServicio.seleccionarProducto = new Producto();
    }

    this.estadoBoton();
  }
}
