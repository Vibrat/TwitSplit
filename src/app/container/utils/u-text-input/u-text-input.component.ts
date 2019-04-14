import { Component, Output, Input, EventEmitter, Renderer2, ElementRef, ViewChild, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'u-text-input',
    template: `<textarea 
                    #input
                    [placeholder]="placeholder" 
                    (change)="onTyping($event)"
                    [value]="content"></textarea>`,
    styleUrls: ['u-text-input.component.scss']
})
export class UTextInputComponent  {

    @Input() placeholder: string = '';
    @Input() content: string = '';
    @Output() whenTyping: EventEmitter<string> = new EventEmitter();

    protected onTyping(event) {
        this.content = event.target.value; 
        this.whenTyping.emit(this.content);
    }
}