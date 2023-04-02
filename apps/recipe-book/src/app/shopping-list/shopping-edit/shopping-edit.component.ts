import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  editingSub: Subscription;
  editingMode = false;
  editItem: Ingredient;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {
    this.editingSub = this.slService.startEditing.subscribe((id) => {
      this.editingMode = true;
      this.editItem = this.slService.getById(id);
      this.slForm.setValue({
        id: this.editItem.id,
        name: this.editItem.name,
        amount: this.editItem.amount,
      });
    });
  }

  onSubmit(form: NgForm) {
    const formField = form.value;

    if (this.editingMode) {
      this.slService.updateIngredient(
        formField.id,
        formField.name,
        formField.amount
      );
      this.editingMode = false;
    } else this.slService.addIngredient(formField.name, formField.amount);

    this.onIngredientReset();
  }

  onIngredientReset() {
    this.slForm.reset();
    this.editingMode = false;
  }

  onIngredienteRemove() {
    this.slService.removeIngredient(this.editItem.id);
    this.editingMode = false;
  }

  ngOnDestroy() {
    this.editingMode = false;
    this.editingSub.unsubscribe();
  }
}
