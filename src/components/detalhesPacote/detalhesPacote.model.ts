import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { APIConnect } from '../../services/APIConnect';

@Injectable({
  providedIn: 'root',
})

export class DetalhesPacoteModel {

  constructor(public http: Http,
    public apiConnect: APIConnect) { }

  urlApi = 'https://package-stg.travelhubapi.com.br/v1';

  public pesquisarPacote(obj) {
    let apiToken = this.apiConnect.getToken();

    let promise = new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', 'Bearer ' + apiToken);

      let mes = (String(new Date(obj.departureDate).getMonth() + 1).length == 1)?'0' + String(new Date(obj.departureDate).getMonth() + 1):String(new Date(obj.departureDate).getMonth() + 1);
      let dia = (String(new Date(obj.departureDate).getDate()).length == 1)?'0' + String(new Date(obj.departureDate).getDate()):String(new Date(obj.departureDate).getDate());
      let dateDep = String(new Date(obj.departureDate).getFullYear()) + '-' + mes + '-' + dia + 'T00:00:00';

      let apiURL = this.urlApi + '/packages/' + obj.track + '/' + dateDep;

      let options = new RequestOptions({ headers: headers });

      let data = {
        "rooms": [
          {
            "snr": 0,
            "adt": obj.qtdAdultos,
            "chd": obj.qtdCriancas,
            "inf": 0,
            "chdAges": [
              0
            ],
            "infAges": [
              0
            ]
          }
        ]
      }

      this.http.post(apiURL, jQuery.param(data), options)
        .toPromise()
        .then(
          res => {
            var resp = res.json();
            resolve(resp);
          }
        );
    });

    return promise;
  }
}
