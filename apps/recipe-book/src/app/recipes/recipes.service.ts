import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipes.model';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'X-Burger',
      'Esse é burgão da massa',
      'https://cdn.pigz.app/pigzapp/product/01FMTG35FMC7XB1GX6WGPH01BM.webp',
      [
        new Ingredient('Hamburger', 1),
        new Ingredient('Queijo', 2),
        new Ingredient('Batatas fritas', 20),
      ]
    ),
    new Recipe(
      'Cachorro Quente',
      'Prensado sucesso',
      'https://kahdog.com.br/wp-content/uploads/2021/07/Fotos-Site-Kahdog20.jpg',
      [
        new Ingredient('Salsicha', 1),
        new Ingredient('Pão', 1),
        new Ingredient('Batata palha', 50),
      ]
    ),
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
