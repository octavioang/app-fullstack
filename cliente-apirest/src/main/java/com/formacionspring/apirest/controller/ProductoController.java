package com.formacionspring.apirest.controller;


import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.formacionspring.apirest.entity.Producto;
import com.formacionspring.apirest.service.ProductoService;


@RestController
@RequestMapping("api")
@CrossOrigin(origins = "http://localhost:4200/")
public class ProductoController {
	
	@Autowired
	private ProductoService servicio;
	
	@GetMapping("productos")
	public List<Producto> index(){
		return servicio.mostrarProductos();
	}
	
	@GetMapping("productos/{id}")
	public ResponseEntity<?> show(@PathVariable long id) {
		Producto producto = null;
		Map<String,Object> response = new HashMap<>();
		
		
		try {
			producto = servicio.buscarProducto(id);
			if(producto == null) {
				response.put("Mensaje", "El prodcuto con ID: " + id + " no existe en la base de datos");
				return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
			}
			
		}catch (DataAccessException e){
			//si hay error desde la base de datos
			response.put("Mensaje", "Error al realizar consulta en la base de dato");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		return new ResponseEntity<Producto>(producto,HttpStatus.OK);
	}
	
	@PostMapping("productos")
	public ResponseEntity<?> save(@RequestBody Producto producto) {
		Map<String,Object> response = new HashMap<>();
		Producto productoGuardado = null;
		try {
			productoGuardado = servicio.guardarProducto(producto);
		} catch (DataAccessException e) {
			
			response.put("Mensaje", "Error al realizar consulta en la base de dato");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);

		}
		response.put("mensaje","El producto ha sido creado con exito");
		response.put("producto", productoGuardado);
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);
		
	}
	
	@PutMapping("productos/{id}")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> update(@PathVariable long id,@RequestBody Producto producto) {
		
		Producto productoUpdate = null;
		Map<String,Object> response =new HashMap<>();
		
		try {
			
			productoUpdate = servicio.buscarProducto(id);
			if(productoUpdate != null) {
				productoUpdate.setNombre(producto.getNombre());
			}else {
				response.put("mensaje","Error: no se puede editar, el producto con ID: " + id + " no existe en la base de datos");	
				return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_FOUND);
			}
			
			servicio.guardarProducto(productoUpdate);
			
		} catch (DataAccessException e) {
			//si hay error desde la base de datos
			response.put("mensaje","Error al realizar update en la base de datos");
			response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
		response.put("mensaje","El producto ha sido actualizado con éxito!");
		response.put("producto",productoUpdate);
		
		return new ResponseEntity<Map<String,Object>>(response,HttpStatus.CREATED);

	}
	

	
	@DeleteMapping("productos/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        
		Producto productoDelete = null;
		Map<String,Object> response =new HashMap<>();
        
        
        try {
        	productoDelete = servicio.borrarProducto(id);
            
        } catch (DataAccessException e) {
            //si hay error desde la base de datos
            response.put("mensaje","Error al realizar delete en la base de datos");
            response.put("error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        response.put("mensaje","El producto ha sido eliminado con éxito!");
        return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK);
        
    }
	

}
