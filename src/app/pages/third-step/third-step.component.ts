import {Component, inject} from '@angular/core';
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {ConfiguratorService} from "../../services/configurator.service";

@Component({
  selector: 'tcc-third-step',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe
  ],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.scss'
})
export class ThirdStepComponent {
  private configuratorService = inject(ConfiguratorService)

  model$ = this.configuratorService.model$;
  config$ = this.configuratorService.config$;
  color$ = this.configuratorService.color$;
  totalPrice$ = this.configuratorService.totalPrice$;
  isTowHitchSelected$ = this.configuratorService.isTowHitchSelected$;
  isYokeSelected$ = this.configuratorService.isYokeSelected$;
}
