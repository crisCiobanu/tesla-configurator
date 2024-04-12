import {Component, inject} from '@angular/core';
import {AsyncPipe, CurrencyPipe } from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {ConfiguratorService} from "../../services/configurator.service";

@Component({
  selector: 'tcc-second-step',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    CurrencyPipe,
    MatCheckbox
  ],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss'
})
export class SecondStepComponent {
  private configuratorService = inject(ConfiguratorService)

  secondStepForm = this.configuratorService.getForm().controls.secondStep;

  option$ = this.configuratorService.option$;

  isConfigSelected$ = this.configuratorService.isConfigSelected$;
  config$ = this.configuratorService.config$;
}
