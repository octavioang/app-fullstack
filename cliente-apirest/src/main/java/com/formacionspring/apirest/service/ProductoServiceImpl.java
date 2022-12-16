package com.formacionspring.apirest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.formacionspring.apirest.entity.Producto;
import com.formacionspring.apirest.repository.ProductoRepository;

@Service
public class ProductoServiceImpl implements ProductoService{
	
	@Autowired
	private ProductoRepository repositorio;
	
	@Override
	@Transactional(readOnly = true)
	public List<Producto> mostrarProductos() {
		// TODO Auto-generated method stub
		return (List<Producto>) repositorio.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Producto buscarProducto(long id) {
		// TODO Auto-generated method stub
		return repositorio.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Producto guardarProducto(Producto producto) {
		// TODO Auto-generated method stub
		return repositorio.save(producto);
	}

	@Override
	public Producto borrarProducto(long id) {
		// TODO Auto-generated method stub
		Producto productoBorrado = buscarProducto(id);
		repositorio.deleteById(id);
		return productoBorrado;
	}

}
