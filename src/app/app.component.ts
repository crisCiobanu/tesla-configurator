import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {ConfiguratorService} from "./services/configurator.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, NavbarComponent, RouterOutlet, NgOptimizedImage],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{

  configuratorService = inject(ConfiguratorService)

  showImg$ = this.configuratorService.isModelSelected$;
  imgSrc$ = this.configuratorService.imgSrc$;
}
