import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipes.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'X-Burger',
      'Esse é hamburger mais gostoso',
      'https://cdn.pigz.app/pigzapp/product/01FMTG35FMC7XB1GX6WGPH01BM.webp',
      [
        new Ingredient('Hamburger', 1),
        new Ingredient('Queijo', 2),
        new Ingredient('Batatas fritas', 20),
      ]
    ),
    new Recipe(
      2,
      'Cachorro Quente',
      'Prensado com sucesso',
      'https://kahdog.com.br/wp-content/uploads/2021/07/Fotos-Site-Kahdog20.jpg',
      [
        new Ingredient('Salsicha', 1),
        new Ingredient('Pão', 1),
        new Ingredient('Batata palha', 50),
      ]
    ),
  ];

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientList(ingredients);
  }

  getById(id: number): Recipe | undefined {
    return this.recipes.find((x) => x.id === id);
  }
}
