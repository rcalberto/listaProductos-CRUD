import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { ProductosComponent } from './components/productos/productos.component';
import { ListaProductosComponent } from './components/productos/lista-productos/lista-productos.component';
import { ProductoComponent } from './components/productos/producto/producto.component';
import { FormsModule } from '@angular/forms';
import { ServiciosService } from './services/servicios.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    ListaProductosComponent,
    ProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [ServiciosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
