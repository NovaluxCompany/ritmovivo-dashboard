import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../core/service/token.service';

@Component({
  selector: 'app-navigation-bar',
  imports: [RouterModule],
  templateUrl: './navigation-bar.html',
})
export class NavigationBar {
    private route = inject(Router);
    private token = inject(TokenService)
    isExpanded = signal(false);

  toggleSidebar() {
    this.isExpanded.set(!this.isExpanded());
  }

  logout() {
    this.token.removeToken();
    this.route.navigate(['']);
  }
}
