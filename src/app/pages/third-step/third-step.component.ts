import {Component, inject} from '@angular/core';
import {FormProvider} from "../../shared/utility/form-provider.type";
import {combineLatestWith, config, map, shareReplay, startWith, tap} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {ModelsService} from "../../services/models.service";
import {OptionsService} from "../../services/options.service";

@Component({
  selector: 'tcc-third-step',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './third-step.component.html',
  styleUrl: './third-step.component.scss'
})
export class ThirdStepComponent {
  private formProvider = inject(FormProvider);
  private modelService = inject(ModelsService);
  private optionService = inject(OptionsService);

  configuratorForm = this.formProvider.getForm();
  firstStepForm = this.configuratorForm.controls.firstStep;
  secondStepForm = this.configuratorForm.controls.secondStep;

  protected modelId = this.firstStepForm.controls.model.value;

  option$ = this.optionService.getOption(this.modelId)
    .pipe(
      shareReplay(1)
    );

  models$ = this.modelService.getModels().pipe(shareReplay(1));

  modelChange$ = this.firstStepForm.controls.model.valueChanges.pipe(
    startWith(this.firstStepForm.controls.model.value),
    shareReplay(1)
  );

  colorChange$ = this.firstStepForm.controls.color.valueChanges.pipe(
    startWith(this.firstStepForm.controls.color.value),
    shareReplay(1)
  );

  model$ = this.modelChange$.pipe(
    combineLatestWith(this.models$),
    map(([modelId, models]) => {
      return models.find(model => model.code === modelId)
    }),
  )

  color$ = this.colorChange$.pipe(
    combineLatestWith(this.model$),
    map(([colorCode, model]) => {
      return model?.colors.find(color => color.code === colorCode)
    }),
  )

  configChange$ = this.secondStepForm.controls.config.valueChanges.pipe(
    startWith(this.secondStepForm.controls.config.value),
    shareReplay(1)
  );

  config$ = this.configChange$.pipe(
    combineLatestWith(this.option$.pipe(tap(v => console.log(v)))),
    map(([configId, option]) => {
      return option.configs.find(config => config.id === +configId);
    }),
  ).pipe(shareReplay(1))

  totalPrice$ = this.color$.pipe(
    combineLatestWith(this.config$),
    map(([color, config]) => {
      const yoke = this.secondStepForm.controls.yoke.value ? 1000 : 0;
      const towHitch = this.secondStepForm.controls.towHitch.value ? 1000 : 0;
      return (color?.price ?? 0) + (config?.price ?? 0) + yoke + towHitch;
    })
  )


}
