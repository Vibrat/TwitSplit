import { Component } from "@angular/core";
import { AppDataService } from "./app.data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "TwitSplit";
  private _username: string = 'TwitSplit';

  constructor(private _store: AppDataService) {
    this._store.newComposer(this._username, {});
  }

  protected onIncomingMessage(content) {
    const index = this._store.getMessageSize(this._username);
    this._store.updateComposer(this._username, {
      [index]: content
    });
  }

  public getUserFeed() {
    return this._store.getComposer(this._username);
  }
}
