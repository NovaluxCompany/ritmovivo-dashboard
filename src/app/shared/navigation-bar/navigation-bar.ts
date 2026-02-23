import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterModule],
  templateUrl: './navigation-bar.html',
})
export class NavigationBar {
    isExpanded = signal(false);

  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }
}
