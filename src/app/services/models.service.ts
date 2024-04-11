import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface Color {
  code: string,
  description: string,
  price: number
}
export interface Model {
  code: string,
  description: string,
  colors: Color[]
}
@Injectable({
  providedIn: 'root'
})
export class ModelsService {
  http = inject(HttpClient);

  public getModels(): Observable<Model[]> {
    return this.http.get<Model[]>('/models')
  }
}
