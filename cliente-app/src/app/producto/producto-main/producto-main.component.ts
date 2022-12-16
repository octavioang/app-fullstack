import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/usuario/usuario.service';
import swal from 'sweetalert2';
import { Producto } from '../interfaces/producto.interfaces';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-main',
  templateUrl: './producto-main.component.html',
  styles: [
  ]
})
export class ProductoMainComponent implements OnInit {

  producto:Producto[]=[];

  constructor(private servicio:ProductoService, public servicioUsuario:UsuarioService) { }

  ngOnInit(): void {

    this.servicio.mostrarProductos().subscribe(
      resp => {this.producto=resp;console.log("Esto me responde"+this.producto)}
    )

  }

  borrarProducto(producto:Producto):void{
    swal({
      title:"Está seguro?",
      text:`Seguro que desea eliminar el producto ${producto.nombre}`,
      type:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'Si, eliminar!',
      cancelButtonText:'No, cancelar',
      confirmButtonClass:'btn btn-info',
      cancelButtonClass:'btn btn-danger',
      buttonsStyling:false,
      reverseButtons:true
    }).then((result)=>{
      if(result.value){
        this.servicio.delete(producto.id).subscribe(
          resp => {this.producto = this.producto.filter( pro => pro !== producto)
            swal('producto eliminado',`producto ${producto.nombre} ha sido eliminado con éxito`,'success');
            }
        )
      }
    });
  }


}
