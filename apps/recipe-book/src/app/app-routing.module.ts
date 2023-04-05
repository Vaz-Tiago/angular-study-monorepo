import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipes-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeResolverService } from './recipes/recipes-resolver.service';

const routes: Routes = [
  { path: '', redirectTo: 'receitas', pathMatch: 'full' },
  {
    path: 'receitas',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'nova', component: RecipeEditComponent },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id/editar',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
  { path: 'lista-de-compras', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
