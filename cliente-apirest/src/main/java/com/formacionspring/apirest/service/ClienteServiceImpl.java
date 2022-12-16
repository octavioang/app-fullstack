package com.formacionspring.apirest.service;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.formacionspring.apirest.entity.Cliente;
import com.formacionspring.apirest.entity.Region;
import com.formacionspring.apirest.repository.ClienteRepository;

@Service
public class ClienteServiceImpl implements ClienteService {
	
	
	@Autowired
	private ClienteRepository repositorio;
	
	//Metodo para mostrar todos los clientes
	@Override
	@Transactional(readOnly = true)
	public List<Cliente> mostrarClientes(){
		return (List<Cliente>) repositorio.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Cliente buscarCliente(long id) {
		return repositorio.findById(id).orElse(null);
	}

	@Override
	@Transactional
	public Cliente guardarCliente(Cliente cliente) {
		return repositorio.save(cliente);
	}

	@Override
	public Cliente borrarCliente(long id) {
		Cliente clienteBorrado = buscarCliente(id);
		repositorio.deleteById(id);
		return clienteBorrado;
	}

//	@Override
//	@Transactional
//	public void borrarCliente(long id) {
//		repositorio.deleteById(id);
//		
//	}
	
	@Override
	@Transactional(readOnly = true)
	public Cliente buscarClienteEmail(String email) {
		return repositorio.findByEmail(email);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Region> mostrarRegiones() {
		return repositorio.mostrarRegiones();
	}

	

}
