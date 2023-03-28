import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 3),
  ];

  onAddItem(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  onRemoveItem(ingredientName: string) {
    this.ingredients = this.ingredients.filter(
      (x) => x.name !== ingredientName
    );
  }
}
