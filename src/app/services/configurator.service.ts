import {inject, Injectable} from '@angular/core';
import {ModelsService} from "./models.service";
import {OptionsService} from "./options.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfiguratorFormControl} from "../shared/types/configurator-form-control";
import {combineLatestWith, filter, map, shareReplay, startWith, switchMap, tap} from "rxjs";
import {IMAGE_BASE_URL} from "../shared/utility/constants";

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  modelService = inject(ModelsService);
  optionService = inject(OptionsService);

  private configuratorForm: FormGroup<ConfiguratorFormControl>
    = new FormGroup({
    firstStep: new FormGroup({
      model: new FormControl('', {nonNullable: true, validators: Validators.required}),
      color: new FormControl('', {nonNullable: true, validators: Validators.required})
    }),
    secondStep: new FormGroup({
      config: new FormControl('', {nonNullable: true, validators: Validators.required}),
      towHitch: new FormControl(false, {nonNullable: true}),
      yoke: new FormControl(false, {nonNullable: true}),
    })
  })

  private firstStepForm = this.configuratorForm.controls.firstStep;
  private secondStepForm = this.configuratorForm.controls.secondStep;

  firstStepChanges$ = this.configuratorForm.controls.firstStep.valueChanges.pipe(
    shareReplay(1)
  );

  secondStepChanges$ = this.configuratorForm.controls.secondStep.valueChanges.pipe(
    shareReplay(1)
  );

  configChange$ = this.secondStepChanges$.pipe(
    map(value => value.config),
    startWith(this.secondStepForm.controls.config.value),
    shareReplay(1)
  );

  modelChange$ = this.firstStepChanges$.pipe(
    map(value => value.model),
    startWith(this.firstStepForm.controls.model.value),
    shareReplay(1)
  )

  colorChange$ = this.firstStepChanges$.pipe(
    map(value => value.color),
    startWith(this.firstStepForm.controls.color.value),
    shareReplay(1)
  );

  option$ = this.firstStepChanges$.pipe(
    map(value => value.model || ""),
    switchMap(modelId => this.optionService.getOption(modelId))
  )

  config$ = this.configChange$.pipe(
    combineLatestWith(this.option$.pipe(tap(v => console.log(v)))),
    map(([configId, option]) => {
      return option.configs.find(config => config.id === +(configId || 0));
    }),
  ).pipe(shareReplay(1))

  models$ = this.modelService.getModels().pipe(shareReplay(1));

  model$ = this.modelChange$.pipe(
    combineLatestWith(this.models$),
    map(([modelId, models]) => {
      return models.find(model => model.code === modelId)
    }),
  )

  color$ = this.colorChange$.pipe(
    tap(color => console.log(`Color is ${color}`)),
    combineLatestWith(this.model$),
    map(([colorCode, model]) => {
      return model?.colors.find(color => color.code === colorCode)
    }),
  ).pipe(shareReplay(1))

  colors$ = this.modelChange$.pipe(
    combineLatestWith(this.models$),
    map(([modelCode, models]) => {
      return models.find(m => m.code === modelCode)?.colors || [];
    })
  ).pipe(shareReplay(1));

  showOptions$ = this.modelChange$.pipe(
    filter(value => !!value)
  )

  isConfigSelected$ = this.configChange$.pipe(
    map(value => !!value),
    startWith(false),
    shareReplay(1)
  )

  isModelSelected$ = this.firstStepChanges$.pipe(
    map(value => !!value.model && !!value.color),
    startWith(false),
    shareReplay(1)
  )

  isTowHitchSelected$ = this.secondStepChanges$.pipe(
    map(value => !!value.towHitch)
  )

  isYokeSelected$ = this.secondStepChanges$.pipe(
    map(value => !!value.yoke)
  )

  totalPrice$ = this.color$.pipe(
    combineLatestWith(this.config$),
    map(([color, config]) => {
      const yoke = this.secondStepForm.controls.yoke.value ? 1000 : 0;
      const towHitch = this.secondStepForm.controls.towHitch.value ? 1000 : 0;
      return (color?.price ?? 0) + (config?.price ?? 0) + yoke + towHitch;
    })
  )

  imgSrc$ = this.firstStepChanges$.pipe(
    filter(value => !!value.model && !!value.color),
    map(value => `${IMAGE_BASE_URL}${value.model}/${value.color}.jpg`)
  )

  getForm(): FormGroup<ConfiguratorFormControl> {
    return this.configuratorForm;
  }

}
