import { Component, Output, Input, EventEmitter } from "@angular/core";

@Component({
  selector: `u-btn`,
  template: `
    <div class="container">
      <input (click)="onClick($event)" type="button" value="{{btnName}}" />
    </div>
  `,
  styleUrls: ["u-btn.component.scss"]
})
export class UBtnComponent {
  
  @Input()  btnName: string = 'Submit';  
  @Output() whenClick: EventEmitter<null> = new EventEmitter();

  public onClick() { this.whenClick.emit(); }
}
