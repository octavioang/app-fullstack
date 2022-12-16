package com.formacionspring.apirest.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.formacionspring.apirest.entity.Producto;

@Repository
public interface ProductoRepository extends CrudRepository<Producto, Long>{

}
