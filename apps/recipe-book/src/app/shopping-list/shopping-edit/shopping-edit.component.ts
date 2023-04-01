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

  onAddItem(form: NgForm) {
    const formField = form.value;

    if (this.editingMode)
      this.slService.updateIngredient(
        formField.id,
        formField.name,
        formField.amount
      );
    else this.slService.addIngredient(formField.name, formField.amount);
  }

  onIngredientReset() {}

  onIngredienteRemove() {
    // this.slService.removeIngredient(this.nameInputRef.nativeElement.value);
  }

  ngOnDestroy() {
    this.editingSub.unsubscribe();
  }
}
