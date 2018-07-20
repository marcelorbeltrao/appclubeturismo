import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers  } from '@angular/http';

@Injectable({
  providedIn: 'root',
})

export class APIConnect {
 
  constructor(public http:Http) { }
 
  accessToken = '';

  /**
   * getToken
   */
  public getToken() {
    return this.accessToken;
  }

  /**
   * connectAPI
   */
  public connectAPI() {
    let promise = new Promise((resolve, reject) => {
      
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      let apiURL = 'https://auth-stg.travelhubapi.com.br/oauth2/token';
      let objENvio = {'grant_type': 'client_credentials', 
                     'client_id': 'FD3BC341-0484-4C7B-9A55-6DAC6DC964D3',
                     'client_secret': 'A59B5C69AC8948B2A486D051F55517665EA283828E884665AABAEB940A43AA29ACD2E52127904B5786CA8C8BFF88F120'};

      let options = new RequestOptions({ headers: headers });
      var params = jQuery.param(objENvio);
      this.http.post(apiURL, params, options)
        .toPromise()
        .then(
          res => {
            this.accessToken = res.json().access_token;
            resolve();
          }
        );
    });

    return promise;
  }
}