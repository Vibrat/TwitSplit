import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";

import { MessageChunker } from "../../controller/splitMessage";

@Component({
  selector: `d-container-feed`,
  templateUrl: "feed.component.html",
  styleUrls: ["feed.component.scss"]
})
export class FeedComponent {
  
  @Input("feedContent") $feedContent: Observable<object>;

  constructor() {}

  public splitMessage(message: string) {
    return new MessageChunker().splitMessage(message);
  }
}
