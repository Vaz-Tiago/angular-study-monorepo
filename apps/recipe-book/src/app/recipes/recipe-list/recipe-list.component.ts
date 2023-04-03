import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  private recipeChangeSub: Subscription;
  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangeSub = this.recipeService.isRecipeChange.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    });
  }

  ngOnDestroy(): void {
    this.recipeChangeSub.unsubscribe();
  }
}
