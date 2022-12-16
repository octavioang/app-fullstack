package com.formacionspring.apirest.service;
import java.util.List;
import com.formacionspring.apirest.entity.Cliente;
import com.formacionspring.apirest.entity.Region;


public interface ClienteService {
	
	
	//Metodo para mostrar todos los clientes
	public List<Cliente> mostrarClientes();
	
	//metodo que busque cliente por id
	public Cliente buscarCliente(long id);
	
	//metodo para crear nuevo cliente	
	public Cliente guardarCliente(Cliente cliente);
	
	//metodo para borrar un cliente
	//public void borrarCliente(long id);
	public Cliente borrarCliente(long id);
	
	//metodo para buscar por email
	public Cliente buscarClienteEmail(String email);
		
	//metodo para mostrar regiones
	public List<Region> mostrarRegiones();
		

	

}
