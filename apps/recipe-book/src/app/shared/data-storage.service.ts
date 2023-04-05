import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable()
export class DataStorageService {
  private storeRecipeUrl =
    'https://ng-recipe-book-79bd8-default-rtdb.firebaseio.com/recipes.json';
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.storeRecipeUrl, recipes).subscribe((resData) => {
      console.log('response: ', resData);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.storeRecipeUrl)
      .pipe(
        map(this.formatRecipeResponse),
        tap(this.setFetchedRecipes.bind(this))
      );
  }

  private formatRecipeResponse(recipes: Recipe[]): Recipe[] {
    return recipes.map((item) => {
      return {
        ...item,
        ingredients: item?.ingredients || [],
      };
    });
  }

  private setFetchedRecipes(recipes: Recipe[]) {
    this.recipeService.setRecipes(recipes);
  }
}
