import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

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

  getClientData() {
    return this._http.get('http://localhost:8080/api/client/allClients');

  }

  insertClient(client: any) {
    console.log(client);
    let clientArray = []
    clientArray.push(client);
    console.log(clientArray);

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(clientArray);
    console.log(body)
    return this._http.post("http://localhost:8080/api/client", body, { 'headers': headers })
  }

  populateForm(client: any) {
    this.form.setValue(client);
  }

}
