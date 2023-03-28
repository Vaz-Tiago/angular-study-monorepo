import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  serverElements = [
    { type: "server", name: "TestServer", content: "Just a test" },
  ];

  onServerAdded(data: { name: string; content: string }) {
    this.serverElements.push({
      type: "server",
      name: data.name,
      content: data.content,
    });
  }

  onBlueprintAdded(data: { name: string; content: string }) {
    this.serverElements.push({
      type: "blueprint",
      name: data.name,
      content: data.content,
    });
  }
}
