package com.example.simactest.Service;

import com.example.simactest.Model.Product;
import com.example.simactest.Repo.ProdRep;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ProdService {
    private final ProdRep productRepository;

    public ProdService(ProdRep productRepository) {
        this.productRepository = productRepository;
    }
    public Product insertNewProduct(Product product){
        return productRepository.save(product);
    }

    public Product getProductById(Long id) {
        return findProduct(id);
    }

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public void deleteProductById(Long id){
        Product product = findProduct(id);
        productRepository.delete(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = findProduct(id);

        existing.setName(updatedProduct.getName());
        existing.setPrice(updatedProduct.getPrice());
        existing.setDescription(updatedProduct.getDescription());
        existing.setQuantity(updatedProduct.getQuantity());

        return productRepository.save(existing);
    }

    private Product findProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Product not found"
                ));
    }
}
