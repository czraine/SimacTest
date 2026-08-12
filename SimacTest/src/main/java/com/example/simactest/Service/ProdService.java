package com.example.simactest.Service;

import com.example.simactest.Model.Product;
import com.example.simactest.Repo.ProdRep;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdService {
    private  ProdRep productRepository;

    public ProdService(ProdRep productRepository) {
        this.productRepository = productRepository;
    }
    public Product insertNewProduct(Product product){
        return productRepository.save(product);
    }
public Product getProductById (Long id) {return  productRepository.findById(id) ;}
    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public void deleteProductById(Long id){
        Product product = productRepository.findById(id ) ;
        productRepository.delete(product);
    }
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepository.findById(id) ;

        existing.setName(updatedProduct.getName());
        existing.setPrice(updatedProduct.getPrice());
        existing.setDescription(updatedProduct.getDescription());
        existing.setQuantity(updatedProduct.getQuantity());

        return productRepository.save(existing);
    }
}
