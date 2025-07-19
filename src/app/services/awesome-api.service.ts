import { Inject, Injectable } from '@angular/core';
import { ILogger, LOGGER_TOKEN } from '../ILogger';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Cotacao } from '../models/Cotacao.model';

@Injectable({
  providedIn: 'root'
})
export class AwesomeApiService {

  constructor(
    @Inject(LOGGER_TOKEN)
    private log: ILogger,
    private http: HttpClient
  ) { }

  public ultimaCotacao$(de: string, para: string): Observable<Cotacao | null> {
    this.log.logInformation(`Buscando a última cotação de ${de} para ${para}...`);
    
    const response = this.http.get(`https://economia.awesomeapi.com.br/json/last/${de}-${para}`); 

    return response.pipe(
      map((a: any) => a[`${de}${para}`] as (Cotacao | null)),
      catchError((error: HttpErrorResponse) => {
        this.log.logError(`Erro ao buscar a última cotação de ${de} para ${para}: ${error.message}`);
        return of(null);
      })
    )
  }

}
