import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, ButtonModule, InputTextModule, TableModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  errorMessage = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: () => this.errorMessage = 'Could not load the products.'
    });
  }

  deleteProduct(product: Product): void {
    if (!product.id || !confirm(`Delete ${product.name}?`)) {
      return;
    }

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        this.products = this.products.filter(item => item.id !== product.id);
      },
      error: () => this.errorMessage = 'Could not delete the product.'
    });
  }
}
