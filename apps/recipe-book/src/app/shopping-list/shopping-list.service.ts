import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<void>();
  private ingredients = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 3),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientsChanged.emit();
  }

  removeIngredient(name: string) {
    this.ingredients = this.ingredients.filter((x) => x.name !== name);
    this.ingredientsChanged.emit();
  }
}
