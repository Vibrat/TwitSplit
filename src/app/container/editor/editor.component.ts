import { Component, Output, EventEmitter } from "@angular/core";

@Component({
    selector: `d-container-editor`,
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.scss']
})
export class EditorComponent {

    @Output() whenSubmit: EventEmitter<string> = new EventEmitter();
    public data: string = '';

    protected onClick() { 
        this.whenSubmit.emit(this.data);
        this.data = ''; 
    }
    protected whenTyping(data) { this.data = data; }   
}