import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingListEditComponent {
  @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @Output() removeShoppingItem = new EventEmitter<string>();
  @Output() newShoppingItem = new EventEmitter<Ingredient>();

  onIngredientAdd() {
    this.newShoppingItem.emit(
      new Ingredient(
        this.nameInputRef.nativeElement.value,
        this.amountInputRef.nativeElement.value
      )
    );
  }

  onIngredientReset() {
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }

  onIngredienteRemove() {
    if (this.nameInputRef.nativeElement.value === '') {
      return alert('Necessário informar o item a ser removido');
    }
    this.removeShoppingItem.emit(this.nameInputRef.nativeElement.value);
  }
}
