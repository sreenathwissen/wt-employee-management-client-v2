import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IClient } from '../client-details/IClient';
import { catchError, map } from 'rxjs/operators';
import { Constants } from '../shared/constants/Constants';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientList!: IClient[];
  clientListForFilter!: IClient[];

  constructor(private _http: HttpClient) {}

  form: FormGroup = new FormGroup({
    clientId: new FormControl(0, Validators.required),
    clientName: new FormControl('', Validators.required),
    clientLocation: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.form.setValue({
      clientId: 0,
      clientName: '',
      clientLocation: '',
    });
  }

  getClientData(): Observable<IClient[]> {
    return this._http.get<IClient[]>(Constants.BASE_URL + Constants.CLIENT_URL + Constants.ALL_CLIENTS);
  }

  searchClientData(searchPattern: String): Observable<IClient[]> {
    return this._http.get<IClient[]>(
      Constants.BASE_URL + Constants.CLIENT_URL + Constants.SEARCH_CLIENT + searchPattern
    );
  }

  insertClient(client: IClient) {
    console.log(client);
    let clientArray = [];
    clientArray.push(client);
    console.log(clientArray);
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(clientArray);
    console.log(body);
    return this._http.post(Constants.BASE_URL + Constants.CLIENT_URL, body, {
      headers: headers,
    });
  }

  populateForm(client: IClient) {
    this.form.setValue(client);
  }
}
