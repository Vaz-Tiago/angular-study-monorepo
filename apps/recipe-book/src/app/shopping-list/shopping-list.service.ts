import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<void>();
  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    this.ingredientsChanged.next();
  }

  removeIngredient(name: string) {
    this.ingredients = this.ingredients.filter((x) => x.name !== name);
    this.ingredientsChanged.next();
  }

  addIngredientList(ingredients: Ingredient[]) {
    ingredients.forEach((item) => {
      const index = this.ingredients.findIndex((x) => x.name === item.name);
      if (index === -1) this.ingredients.push(item);
      else this.ingredients[index].amount += item.amount;
    });
    this.ingredientsChanged.next();
  }
}
