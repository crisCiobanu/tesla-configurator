import {FormControl, FormGroup} from "@angular/forms";



export interface ConfiguratorFormControl {
    firstStep: FormGroup<{model: FormControl<string>, color: FormControl<string>}>,
    secondStep: FormGroup<{config: FormControl<string>, towHitch: FormControl<boolean>, yoke : FormControl<boolean>}>
}
