package com.formacionspring.apirest.service;

import java.util.List;

import com.formacionspring.apirest.entity.Venta;

public interface VentaService {

	
	
		public List<Venta> mostrarVentas();
		
		
		public Venta buscarVenta(long id);
		
		
		public Venta guardarVenta(Venta venta);
		
	
		public Venta borrarVenta(long id);
		
}
