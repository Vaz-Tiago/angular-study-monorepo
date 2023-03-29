import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  constructor(private slService: ShoppingListService) {}

  onIngredientAdd() {
    this.slService.addIngredient(
      this.nameInputRef.nativeElement.value,
      this.amountInputRef.nativeElement.value
    );
  }

  onIngredientReset() {
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }

  onIngredienteRemove() {
    this.slService.removeIngredient(this.nameInputRef.nativeElement.value);
  }
}
