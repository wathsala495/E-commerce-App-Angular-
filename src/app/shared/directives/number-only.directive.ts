import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberOnly]',
  standalone: true
})
export class NumberOnlyDirective {

  constructor(private _e1:ElementRef) { }

  @HostListener('input',['$event']) onInputChange(event:any){
      const initialValue=this._e1.nativeElement.value;
      if(initialValue==0){
        this._e1.nativeElement.value='';
      }
      else{
        this._e1.nativeElement.value=initialValue.replace(/[^0-9]*/g,'');
        if(initialValue!==this._e1.nativeElement.value){
          event.stopPropagation();
        }
      }
  }

}
