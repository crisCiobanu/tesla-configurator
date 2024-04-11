import {Component, inject} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ConfiguratorService} from "../../../services/configurator.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'tcc-navbar',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private configuratorService = inject(ConfiguratorService);
  isConfigSelected$ = this.configuratorService.isConfigSelected$;
  isModelSelected$ = this.configuratorService.isModelSelected$;

}
