import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { APIConnect } from '../../services/APIConnect';

@Injectable({
    providedIn: 'root',
})

export class ServicosModel {

    constructor(public http: Http,
        public apiConnect: APIConnect) { }

    urlApi = 'https://ticket-stg.travelhubapi.com.br/v1';


    public buscaTraslados(param) {
        let apiToken = this.apiConnect.getToken();
        
        let destino = param.idLocalSelecionado;
        
        let mes = (String(new Date(param.dataInicio).getMonth() + 1).length == 1)?'0' + String(new Date(param.dataInicio).getMonth() + 1):String(new Date(param.dataInicio).getMonth() + 1);
        let dia = (String(new Date(param.dataInicio).getDate()).length == 1)?'0' + String(new Date(param.dataInicio).getDate()):String(new Date(param.dataInicio).getDate());
        let checkIn = String(new Date(param.dataInicio).getFullYear()) + '-' + mes + '-' + dia ;


        let mesF = (String(new Date(param.dataFim).getMonth() + 1).length == 1)?'0' + String(new Date(param.dataFim).getMonth() + 1):String(new Date(param.dataFim).getMonth() + 1);
        let diaF = (String(new Date(param.dataFim).getDate()).length == 1)?'0' + String(new Date(param.dataFim).getDate()):String(new Date(param.dataFim).getDate());
        let checkOut = String(new Date(param.dataFim).getFullYear()) + '-' + mesF + '-' + diaF ;

        let customer = 'adt=1';

        let promise = new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', 'bearer ' + apiToken);

            let apiURL = this.urlApi + '/availabilities/' + destino + '/' + checkIn + '/' + checkOut +'?customer=' + customer;

            let options = new RequestOptions({ headers: headers });

            this.http.get(apiURL, options)
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
}
