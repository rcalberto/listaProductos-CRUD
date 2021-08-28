import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  seleccionarProducto: Producto = new Producto();
  estadoServicio: string = 'Agregar';

  constructor(private firebase: AngularFirestore) {}

  getProductos(): Observable<any> {
    return this.firebase.collection('productos').snapshotChanges();
  }

  agregarProducto(producto: Producto): Promise<any> {
    return this.firebase.collection('productos').add(producto);
  }
  deleteProducto($key: string): Promise<any> {
    return this.firebase.collection('productos').doc($key).delete();
  }

  getPorducto(producto: Producto): Observable<any> {
    return this.firebase
      .collection('productos')
      .doc(producto.$key)
      .snapshotChanges();
  }
  editarProducto(producto: Producto) {
    return this.firebase
      .collection('productos')
      .doc(producto.$key)
      .update(producto);
  }
}
