import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { Recipe } from '../recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  recipe: Recipe;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(({ id }) => {
      if (+id > 0) {
        this.editMode = id >= 0;
        this.recipe = this.recipeService.getById(+id);
        this.initForm();
      }
    });

    this.initForm();
  }

  private initForm() {
    const ingredients = new FormArray([]);
    if (this.recipe?.ingredients?.length > 0) {
      for (let ingredient of this.recipe.ingredients) {
        ingredients.push(
          new FormGroup({
            id: new FormControl(ingredient.id),
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount, [
              Validators.required,
              Validators.min(1),
            ]),
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      id: new FormControl(this.recipe?.id || ''),
      name: new FormControl(this.recipe?.name || '', Validators.required),
      imagePath: new FormControl(
        this.recipe?.imagePath || '',
        Validators.required
      ),
      description: new FormControl(
        this.recipe?.description || '',
        Validators.required
      ),
      ingredients,
    });
  }

  getIngredientesList() {
    return (this.recipeForm?.get('ingredients') as FormArray)?.controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        id: new FormControl(),
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    const { id, name, description, imagePath, ingredients } =
      this.recipeForm?.value;
    if (!this.editMode) {
      this.recipeService.addRecipe(name, imagePath, description, ingredients);
    } else {
      this.recipeService.updateRecipe(
        id,
        name,
        imagePath,
        description,
        ingredients
      );
    }

    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
