import {Component, inject} from '@angular/core';
import {FormProvider} from "../../shared/utility/form-provider.type";
import {AsyncPipe, CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {OptionsService} from "../../services/options.service";
import {ReactiveFormsModule} from "@angular/forms";
import {combineLatestWith, filter, map, shareReplay, startWith, tap} from "rxjs";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'tcc-second-step',
  standalone: true,
  imports: [
    AsyncPipe,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    CurrencyPipe,
    MatCheckbox
  ],
  templateUrl: './second-step.component.html',
  styleUrl: './second-step.component.scss'
})
export class SecondStepComponent {
  private formProvider = inject(FormProvider);
  private optionService = inject(OptionsService);
  firstStepForm = this.formProvider.getForm().controls.firstStep;
  secondStepForm = this.formProvider.getForm().controls.secondStep;

  protected modelId = this.firstStepForm.controls.model.value;

  option$ = this.optionService.getOption(this.modelId)
    .pipe(
      shareReplay(1)
    );

  configChange$ = this.secondStepForm.controls.config.valueChanges.pipe(
    startWith(this.secondStepForm.controls.config.value),
    shareReplay(1)
  );

  isConfigSelected$ = this.configChange$.pipe(
    map(value => !!value)
  )

  config$ = this.configChange$.pipe(
    tap(val => console.log(`Value of val is : ${val}`)),
    // filter(value => !!value),
    combineLatestWith(this.option$.pipe(tap(v => console.log(v)))),
    map(([configId, option]) => {
      return option.configs.find(config => config.id === +configId);
    }),
    tap(val => console.log(`After map: ${val?.id}`)),
    // filter(value => !value)
  ).pipe(shareReplay(1))



}
