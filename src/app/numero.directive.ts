import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumero]'
})
export class NumeroDirective {
  /* Somente digitos de 0-9 e um único ponto*/
  private regex: RegExp = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  /* teclas especiais permitidas */
  private especialkeys: Array<string> = ['Backspace', 'Delete', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight'];
  constructor(private el: ElementRef) { }
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent){
    /* Permite teclas especiais */
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    /* Obtém o elemento que recebeu a diretiva*/
    let current: string = this.el.nativeElement.value;
    /* O value do elemento ainda não foi atualizado no DOM */
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}