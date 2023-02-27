import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from '../client-details/IClient';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientList!: IClient[];

  constructor(private _http: HttpClient) { }


  form: FormGroup = new FormGroup({
    clientId: new FormControl(0, Validators.required),
    clientName: new FormControl('', Validators.required),
    clientLocation: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      clientId: 0,
      clientName: '',
      clientLocation: ''
    });
  }

  getClientData(): Observable<IClient[]> {
    return this._http.get<IClient[]>('http://localhost:8080/api/client/allClients');

  }

  searchClientData(searchPattern: String): Observable<IClient[]> {
    return this._http.get<IClient[]>('http://localhost:8080/api/client/search?clientName=' + searchPattern);

  }

  insertClient(client: IClient) {
    console.log(client);
    let clientArray = []
    clientArray.push(client);
    console.log(clientArray);

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(clientArray);
    console.log(body)
    return this._http.post("http://localhost:8080/api/client", body, { 'headers': headers })
  }

  populateForm(client: IClient) {
    this.form.setValue(client);
  }

}
