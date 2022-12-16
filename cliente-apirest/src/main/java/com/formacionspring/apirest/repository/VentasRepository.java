package com.formacionspring.apirest.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.formacionspring.apirest.entity.Venta;

@Repository
public interface VentasRepository extends JpaRepository<Venta, Long>{

}

