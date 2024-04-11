import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {ModelsService} from "./services/models.service";
import {NavbarComponent} from "./shared/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {FormProvider} from "./shared/utility/form-provider.type";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfiguratorFormControl} from "./shared/utility/types";
import {filter, map, shareReplay, startWith, tap} from "rxjs";
import {IMAGE_BASE_URL} from "./shared/utility/constants";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, NgForOf, NgIf, NavbarComponent, RouterOutlet, NgOptimizedImage],
  providers: [{provide: FormProvider, useExisting: AppComponent}],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent extends FormProvider {
  configuratorForm: FormGroup<ConfiguratorFormControl>
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

  modelChanges$ = this.configuratorForm.controls.firstStep.valueChanges.pipe(
    shareReplay(1)
  );

  showImg$ = this.modelChanges$.pipe(
    map(value => !!value.model && !!value.color)
  )

  imgSrc$ = this.modelChanges$.pipe(
    filter(value => !!value.model && !!value.color),
    map(value => `${IMAGE_BASE_URL}${value.model}/${value.color}.jpg`)
  )

  override getForm(): FormGroup<ConfiguratorFormControl> {
    return this.configuratorForm;
  }


}
