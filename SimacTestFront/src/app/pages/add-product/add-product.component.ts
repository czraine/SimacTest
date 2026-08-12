import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageModule } from 'primeng/message';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    ButtonModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    MessageModule
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  product: Product = this.emptyProduct();
  productId?: number;
  isEditMode = false;
  message = '';
  messageType: 'success' | 'error' = 'success';
  saving = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productId = Number(id);
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  saveProduct(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.saving = true;
    this.message = '';

    const request = this.isEditMode && this.productId
      ? this.productService.updateProduct(this.productId, this.product)
      : this.productService.createProduct(this.product);

    request.subscribe({
      next: () => {
        if (this.isEditMode) {
          this.router.navigate(['/products']);
          return;
        }

        this.messageType = 'success';
        this.message = 'Product added successfully.';
        this.product = this.emptyProduct();
        form.resetForm(this.product);
        this.saving = false;
      },
      error: () => {
        this.messageType = 'error';
        this.message = this.isEditMode
          ? 'Could not update the product.'
          : 'Could not add the product.';
        this.saving = false;
      }
    });
  }

  private loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => this.product = product,
      error: () => {
        this.messageType = 'error';
        this.message = 'Could not load the product.';
      }
    });
  }

  private emptyProduct(): Product {
    return {
      name: '',
      price: 0,
      description: '',
      quantity: 0
    };
  }
}
