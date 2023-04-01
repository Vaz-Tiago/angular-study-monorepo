import { generateId } from '../shared/generateId';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<void>();
  startEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(name: string, amount: number) {
    let id = 1;
    let alreadyExists = true;
    while (alreadyExists) {
      id = generateId();
      const idExists = this.getById(id) !== undefined;
      const item = this.getByName(name);
      if (item !== undefined) {
        const index = this.ingredients.findIndex((x) => x.id === item.id);
        this.ingredients[index].amount += amount;
        return;
      }
      if (!idExists) alreadyExists = false;
    }

    this.ingredients.push(new Ingredient(id, name, amount));
    this.ingredientsChanged.next();
  }

  updateIngredient(id: number, name: string, amount: number) {
    const index = this.getIndexById(id);
    this.ingredients[index].name = name;
    this.ingredients[index].amount = amount;
  }

  removeIngredient(id: number) {
    this.ingredients = this.ingredients.filter((x) => x.id !== id);
    this.ingredientsChanged.next();
  }

  addIngredientList(ingredients: Ingredient[]) {
    ingredients.forEach((item) => {
      const index = this.ingredients.findIndex((x) => x.id === item.id);
      if (index === -1) this.ingredients.push(item);
      else this.ingredients[index].amount += item.amount;
    });
    this.ingredientsChanged.next();
  }

  getById(id: number) {
    return this.ingredients.find((x) => x.id === id);
  }

  private getIndexById(id: number) {
    return this.ingredients.findIndex((x) => x.id === id);
  }

  private getByName(name: string) {
    return this.ingredients.find((x) => x.name === name);
  }
}
