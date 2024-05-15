import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryDTO, ProductDTO, UserDTO } from '../../../models';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  isNewProduct = true;

  users: UserDTO[] = [];

  categories: CategoryDTO[] = [];

  productForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    title: this.formBuilder.control(''),
    description: this.formBuilder.control(''),
    price: this.formBuilder.control(0),
    imgUrl: this.formBuilder.control(''),
    brand: this.formBuilder.control(''),
    expiration: this.formBuilder.control(new Date().toISOString().split('T')[0]),
    uploader: this.formBuilder.control<null | UserDTO>(null),
    categories: this.formBuilder.control<CategoryDTO[]>([])
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private userService: UserService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.isNewProduct = false;

      this.productService.getOne(id).subscribe({
        next: (product) => this.productForm.setValue(product),
        error: (err) => {
          console.error(err);
          this.toastrService.error('A termékadatok betöltése sikertelen.', 'Hiba');
        }
      });
    }

    this.userService.getAll().subscribe({
      next: (users) => this.users = users,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A felhasználók betöltése sikertelen.', 'Hiba');
      }
    });

    this.categoryService.getAll().subscribe({
      next: (categories) => this.categories = categories,
      error: (err) => {
        console.error(err);
        this.toastrService.error('A kategóriák betöltése sikertelen.', 'Hiba');
      }
    });
  }

  saveProduct() {
    const product = this.productForm.value as ProductDTO;

    if (this.isNewProduct) {
      this.productService.create(product).subscribe({
        next: (product) => {
          this.toastrService.success('Termék sikeresen hozzáadva, id:' + product.id, 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A termék hozzáadása nem sikerült.', 'Hiba');
        }
      });
    }
    else {
      this.productService.update(product).subscribe({
        next: (product) => {
          this.toastrService.success('Termék sikeresen szerkesztve', 'Siker');
        },
        error: (err) => {
          this.toastrService.error('A termék szerkesztése nem sikerült.', 'Hiba');
        }
      });
    }
    
  }

  compareObjects(obj1: any, obj2: any) {
    return obj1 && obj2 && obj1.id == obj2.id;
  }
}