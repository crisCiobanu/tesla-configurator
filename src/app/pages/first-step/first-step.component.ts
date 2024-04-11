import {Component, inject} from '@angular/core';
import {FormProvider} from "../../shared/utility/form-provider.type";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {ModelsService} from "../../services/models.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import {combineLatestWith, filter, map, shareReplay, startWith, tap} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'tcc-first-step',
  standalone: true,
  imports: [
    MatSelect,
    MatFormField,
    MatLabel,
    MatOption,
    AsyncPipe,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './first-step.component.html',
  styleUrl: './first-step.component.scss'
})
export class FirstStepComponent {
  private formProvider = inject(FormProvider);
  private modelService = inject(ModelsService);
  models$ = this.modelService.getModels().pipe(shareReplay(1));
  configurationForm = this.formProvider.getForm();
  firstStepForm = this.configurationForm.controls.firstStep;
  modelChange$ = this.firstStepForm.controls.model.valueChanges.pipe(
    startWith(this.firstStepForm.controls.model.value),
    shareReplay(1)
  );

  colors$ = this.modelChange$.pipe(
    combineLatestWith(this.models$),
    map(([modelCode, models]) => {
      return models.find(m => m.code === modelCode)?.colors || [];
    })
  ).pipe(shareReplay(1));

  showOptions$ = this.modelChange$.pipe(
    tap(option => console.log(`From show option, value : ${option}`)),
    filter(value => !!value)
  )

  onModelChanged() {
    this.firstStepForm.controls.color.reset();
    this.configurationForm.controls.secondStep.reset();
    // debugger
  }

}
