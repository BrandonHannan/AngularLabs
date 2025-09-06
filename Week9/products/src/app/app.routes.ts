import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductList } from '../components/product-list/product-list';
import { ProductForm } from '../components/product-form/product-form';

export const routes: Routes = [
    { path: 'products', component: ProductList }, // Shows the given list of products
    { path: 'products/add', component: ProductForm }, // For adding a product
    { path: 'products/edit/:id', component: ProductForm }, // For updating a product
    { path: '', redirectTo: '/products', pathMatch: 'full' } // Ensures that the products route is the default route
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
