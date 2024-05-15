import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';


const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  },
  {
    path: 'product-form',
    component: ProductFormComponent
  },
  {
    path: 'product-form/:id',
    component: ProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }