import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipes.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Observable } from 'rxjs';
import { RecipeService } from './recipes.service';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipeList = this.recipeService.getRecipes();
    if (recipeList?.length > 0) return recipeList;
    return this.dataStorageService.fetchRecipes();
  }
}
