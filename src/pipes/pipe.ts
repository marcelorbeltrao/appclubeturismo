import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'idadeCriancaPipe'})
export class IdadeCriancaPipe implements PipeTransform {
  transform(value: number, item:any): string {

    item.classe = '';

    if(value==0){
        item.classe = 'fonteIdadePeq';
        return 'Até 12 meses';
    }
    else if(value == 1)
        return value + ' ano';
    else
        return value + ' anos';
  }

}

@Pipe({name: 'diaMesSelecionadoPipe'})
export class diaMesSelecionadoPipe implements PipeTransform {
  transform(value: Date): string {
    var meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    if(!value)
        return '';

    return value.getDate() + ' de ' + meses[value.getMonth()];
  }

}

@Pipe({name: 'diaSemanaSelecionadoPipe'})
export class diaSemanaSelecionadoPipe implements PipeTransform {
  transform(value: Date): string {
    var semana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];
    if(!value)
        return '';

    return semana[value.getDay()];
  }

}

@Pipe({name: 'mesExtensoPipe'})
export class mesExtensoPipe implements PipeTransform {
  transform(value: any): string {
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    if(!value)
        return '';

    return meses[value];
  }

}