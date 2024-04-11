import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {ConfiguratorService} from "../../services/configurator.service";
import {map} from "rxjs";

export const thirdStepGuard: CanActivateFn = (route, state) => {
  const configuratorService = inject(ConfiguratorService);
  const router = inject(Router);
  return configuratorService.isConfigSelected$.pipe(
    map(value => value || router.createUrlTree(['']))
  );
};
