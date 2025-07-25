import { Injectable, Signal, signal } from '@angular/core';
import { Cotacao } from '../models/Cotacao.model';

@Injectable({
  providedIn: 'root'
})
export class CotacaoService {
  private cotacao = signal<Cotacao | null>(null);

  constructor() { }

  public setCotacao(novaCotacao: Cotacao | null): void {
    this.cotacao.set(novaCotacao);
  }

  public getCotacao(): Signal<Cotacao | null> {
    return this.cotacao;
  }
}
