package com.example.simactest.Repo;

import com.example.simactest.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdRep extends JpaRepository<Product, Long> {
}
