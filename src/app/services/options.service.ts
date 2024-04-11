import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Model} from "./models.service";


export interface Configuration {
  id: number,
  description: string,
  range: number,
  speed: number,
  price: number
}
export interface Option {
  configs: Configuration[],
  towHitch: boolean,
  yoke: boolean
}

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  http = inject(HttpClient);

  public getOption(id: string): Observable<Option> {
    return this.http.get<Option>(`options/${id}`)
  }
}
