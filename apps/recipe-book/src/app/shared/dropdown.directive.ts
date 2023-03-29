import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  isOpen = false;
  initialClass: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.initialClass = this.elRef.nativeElement.className;
  }

  @HostListener('click') toggleOpen(eventData: Event) {
    this.isOpen = !this.isOpen;
    const className = this.isOpen
      ? `${this.initialClass} open`
      : this.initialClass;
    this.renderer.setAttribute(this.elRef.nativeElement, 'class', className);
  }
}
