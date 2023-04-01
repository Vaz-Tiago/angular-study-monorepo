import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsChangeSub: Subscription;

  constructor(private slService: ShoppingListService) {}
  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.ingredientsChangeSub = this.slService.ingredientsChanged.subscribe(
      () => {
        this.ingredients = this.slService.getIngredients();
      }
    );
  }

  onEditItem(id: number) {
    this.slService.startEditing.next(id);
  }

  ngOnDestroy(): void {
    this.ingredientsChangeSub.unsubscribe();
  }
}
