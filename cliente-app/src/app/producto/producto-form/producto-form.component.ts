import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interfaces';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styles: [
  ]
})
export class ProductoFormComponent implements OnInit {

  productoNew:Producto={
    id: 0,
    nombre: '',
  }

  public id!:string|null;

  constructor(private servicio:ProductoService, private router:Router , private usuarioService:UsuarioService,private activateRoute:ActivatedRoute) { }


  ngOnInit(): void {

    if(this.usuarioService.token == ""){
      swal("No esta autenticado","usuario no autenticado","info")
      this.router.navigate(['/login'])
    }else{

      this.activateRoute.paramMap.subscribe(
        params => {
          this.id =  params.get('id');
         if(this.id){
          this.servicio.getproducto( parseInt(this.id) ).subscribe(
            resp => {this.productoNew = resp }
          );
         }
        }
      );

    }
  }

  guardarProducto():void{
    this.servicio.guardarProducto( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("El producto ",`${this.productoNew.nombre} se ha creado con éxito`,'success');
        this.router.navigate(['/producto']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al crear el producto ${error.status}`,'error');
      }

    )
  }
  editarProducto():void{
    console.log("esto edita",this.productoNew);
    this.servicio.update( this.productoNew ).subscribe(
      resp=> {
        console.log("esto responde",resp);
        swal("El producto ",`${this.productoNew.nombre} se ha editado con éxito`,'success');
        this.router.navigate(['/producto']);
      },
      error=> {
        console.log("error: ",error);
        swal("Error",`error al editar el producto ${error.status}`,'error');
      }

    )

  }
}
