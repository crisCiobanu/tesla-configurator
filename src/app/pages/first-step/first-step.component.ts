import {Component, inject} from '@angular/core';
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {AsyncPipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {ConfiguratorService} from "../../services/configurator.service";

@Component({
  selector: 'tcc-first-step',
  standalone: true,
  imports: [
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    AsyncPipe,
    ReactiveFormsModule
  ],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {
  private configuratorService = inject(ConfiguratorService)
  configurationForm = this.configuratorService.getForm();
  firstStepForm = this.configurationForm.controls.firstStep;

  models$ = this.configuratorService.models$;
  colors$ = this.configuratorService.colors$;
  showOptions$ = this.configuratorService.showOptions$;

  onModelChanged() {
    this.firstStepForm.controls.color.reset();
    this.configurationForm.controls.secondStep.reset();
  }

}
