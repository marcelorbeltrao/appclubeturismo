import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';
import {APIConnect} from '../../services/APIConnect';

@Injectable({
  providedIn: 'root',
})
export class SelecioneCidadeModel {
 
  constructor(public http:Http, 
              public apiConnect:APIConnect) { }

  urlApi = 'https://package-stg.travelhubapi.com.br/v1';
  
  /**
   * connectAPI
   */
  public listaCidades(tipo, idOrigin) {
    let apiToken = this.apiConnect.getToken();

    let promise = new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers.append('Authorization', 'Bearer ' + apiToken);

      var param = (tipo ==0)?'?category=Origin':('?category=Destination&originLocationId=' + idOrigin);
      let apiURL = this.urlApi + '/locations' + param;

      let options = new RequestOptions({ headers: headers });
      
      this.http.get(apiURL, options)
        .toPromise()
        .then(
          res => {
            var resp = res.json();
            resolve(resp.items);
          }
        );
    });

    return promise;
  }
}