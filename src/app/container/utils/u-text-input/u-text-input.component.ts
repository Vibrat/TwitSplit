import { Component } from "@angular/core";

@Component({
    selector: 'u-text-input',
    template: '<textarea (change)="onTyping($event)"></textarea>',
    styleUrls: ['u-text-input.component.scss']
})
export class UTextInputComponent {

    onTyping(event) {
        const userInput = event.target.value;   
        console.log(userInput);
    }
}