import { Directive, OnInit, Renderer2, Inject, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Directive({
  selector: '[appMyDirective]'
})
export class MyDirectiveDirective implements OnInit{
// @HostListener('click') clickMe(){
  
// }
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit() {
  }
myDir(){
  var span = this.renderer.createElement('span');
  var text = this.renderer.createText('1');
  this.renderer.appendChild(span,text);
  this.renderer.addClass(span, 'badge');
  this.renderer.addClass(span, 'badge-pill');
  this.renderer.addClass(span, 'badge-primary');
  this.renderer.appendChild(this.elementRef.nativeElement,span );
}
}

