import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { APIConnect } from '../../services/APIConnect';

@Injectable({
    providedIn: 'root',
})

export class HoteisModel {

    constructor(public http: Http,
        public apiConnect: APIConnect) { }

    urlApi = 'https://hotel-stg.travelhubapi.com.br/v1';

    /**
     * connectAPI
     */
    public pesquisaHoteis(param) {
        let apiToken = this.apiConnect.getToken();

        let promise = new Promise((resolve, reject) => {

            let obj = {
                "brokers": [
                    "FLYTOYR",
                    "FLYTOYR"
                ],
                "locationId": param.idLocalSelecionado,
                "checkIn": param.dataInicio,
                "checkOut": param.dataFim,
                "rooms": [
                    {
                        "adt": param.qtdAdultos,
                        "chd": param.qtdCriancas,
                        "chdAges": param.listaCriancas
                    }
                ],
                "currencyIso": "BRL",
                "hotelName": "",
                "minimumStars": 1,
                "basicInfo": false,
                "bookingAvailability": "AvailableNow",
                "agreement": "Agreement Example",
                "internalHotels": false
            }

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'bearer ' + apiToken);

            let apiURL = this.urlApi + '/Availabilities';

            let options = new RequestOptions({ headers: headers });

            this.http.post(apiURL, obj, options)
                .toPromise()
                .then(
                    res => {
                        var resp = res.json();
                        resolve(resp.items[0].hotels.items);
                    }
                );
        });

        return promise;
    }

    
    public pesquisaHotel(hotel:any) {
        let apiToken = this.apiConnect.getToken();

        let promise = new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'bearer ' + apiToken);

            let apiURL = this.urlApi + '/hotels/' + hotel;

            let options = new RequestOptions({ headers: headers });

            this.http.get(apiURL, options)
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
