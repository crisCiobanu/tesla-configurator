import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Model} from "../shared/types/model";

@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  http = inject(HttpClient);

  public getModels(): Observable<Model[]> {
    return this.http.get<Model[]>('/models')
  }
}
