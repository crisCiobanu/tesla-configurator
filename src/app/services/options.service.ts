import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Option} from "../shared/types/option";

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  http = inject(HttpClient);

  public getOption(id: string): Observable<Option> {
    return this.http.get<Option>(`options/${id}`)
  }
}
