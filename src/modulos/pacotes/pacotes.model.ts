import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { APIConnect } from '../../services/APIConnect';

@Injectable({
    providedIn: 'root',
})

export class PacotesModel { 

    constructor(public http: Http,
        public apiConnect: APIConnect) { }

        urlApi = 'https://package-stg.travelhubapi.com.br/v1';


    public pesquisaPacotes(obj) {
        let apiToken = this.apiConnect.getToken();
    
        let promise = new Promise((resolve, reject) => {
          
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Authorization', 'Bearer ' + apiToken);
    
          let apiURL = this.urlApi + '/availabilities';
    
          let options = new RequestOptions({ headers: headers });
          
          let data = {
            "origin": obj.localOrigem,
            "destination": obj.localDestino,
            "departureMonth": obj.mes,
            "departureYear": obj.ano,
            "currencyIso": "BRL",
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
                resolve(resp.items[0].packages.items);
              }
            );
        });
    
        return promise;
      }


      public pesquisarPacote(obj) {
        let apiToken = this.apiConnect.getToken();
    
        let promise = new Promise((resolve, reject) => {
          
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          headers.append('Authorization', 'Bearer ' + apiToken);
    
          let apiURL = this.urlApi + '/Availabilities';
    
          let options = new RequestOptions({ headers: headers });
          
          let data = {
            "track": obj.localOrigem,
            "departureDate": obj.localDestino,
            "rooms": [
              {
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
                resolve(resp.items[0].packages.items);
              }
            );
        });
    
        return promise;
      }      
}
