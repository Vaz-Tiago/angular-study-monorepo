import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipes.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent {
  @Output() selectedRecipe = new EventEmitter<void>();
  @Input() recipe: Recipe;

  onSelected() {
    this.selectedRecipe.emit();
  }
}
