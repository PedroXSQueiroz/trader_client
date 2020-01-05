import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import QuotationModel from '../models/quotation-model';
import { environment } from 'src/environments/environment';
import Page from '../dtos/page';
import QuotationPage from '../dtos/quotation-page';

@Injectable({
  providedIn: 'root'
})
export class QuotationsService {

  constructor(private _httpClient: HttpClient) 
  {

  }

  async list(): Promise< QuotationPage >
  {
    return await this._httpClient
                          .get<QuotationPage>(`${environment.api}/quotations`)
                          .toPromise();
  }

}
