import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipes.model';
import { generateId } from '../shared/generateId';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  isRecipeChange = new Subject<void>();
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'X-Burger',
      'Esse é hamburger mais gostoso',
      'https://cdn.pigz.app/pigzapp/product/01FMTG35FMC7XB1GX6WGPH01BM.webp',
      [
        new Ingredient(generateId(), 'Hamburger', 1),
        new Ingredient(generateId(), 'Queijo', 2),
        new Ingredient(generateId(), 'Batatas fritas', 20),
      ]
    ),
    new Recipe(
      2,
      'Cachorro Quente',
      'Prensado com sucesso',
      'https://cozinhasimples.com.br/wp-content/uploads/cachorro-quente-cozinha-simples-780x470.jpg',
      [
        new Ingredient(generateId(), 'Salsicha', 1),
        new Ingredient(generateId(), 'Pão', 1),
        new Ingredient(generateId(), 'Batata palha', 50),
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

  addRecipe(
    name: string,
    imagePath: string,
    description: string,
    ingredients: { [key: string]: string }[]
  ) {
    const newIngredientsList = ingredients?.map(
      (item) => new Ingredient(generateId(), item['name'], +item['amount'])
    );

    const newRecipe = new Recipe(
      generateId(),
      name,
      description,
      imagePath,
      newIngredientsList
    );

    this.recipes.push(newRecipe);
    this.isRecipeChange.next();
  }

  updateRecipe(
    id: number,
    name: string,
    imagePath: string,
    description: string,
    ingredients: { [key: string]: string }[]
  ) {
    const index = this.recipes.findIndex((x) => x.id === id);
    const formattedIngredients = ingredients?.map(
      (item) =>
        new Ingredient(+item?.id || generateId(), item?.name, +item?.amount)
    );

    const newRecipe = new Recipe(
      id,
      name,
      description,
      imagePath,
      formattedIngredients
    );

    this.recipes[index] = newRecipe;
    this.isRecipeChange.next();
  }

  removeRecipe(id: number) {
    this.recipes = this.recipes.filter((x) => x.id !== id);
    this.isRecipeChange.next();
  }
}
