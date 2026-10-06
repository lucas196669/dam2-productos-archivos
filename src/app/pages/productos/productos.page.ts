import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
} from '@ionic/angular';
import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton
  ]
})
export class ProductosPage implements OnInit {
  private productService = inject(ProductService);
  theme = inject(ThemeService);

  readonly pageSize = 10;
  products = signal<Product[]>([]);
  total = signal(0);
  loading = signal(false);
  error = signal('');
  page = signal(1);
  totalPages = computed(() => Math.ceil(this.total() / this.pageSize));

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');
    const skip = (this.page() - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip).subscribe({
      next: (response: ProductsResponse) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se han podido cargar los productos.');
        this.loading.set(false);
      }
    });
  }

  goToPage(p: number): void {
    if (p < 1 || p > this.totalPages()) return;
    this.page.set(p);
    this.loadProducts();
  }
}