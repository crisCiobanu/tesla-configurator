import {FormGroup} from "@angular/forms";
import {ConfiguratorFormControl} from "./types";

export abstract class FormProvider {
  abstract getForm(): FormGroup<ConfiguratorFormControl>;
}
