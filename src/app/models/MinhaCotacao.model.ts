export interface MinhaCotacao {
  de: string;
  para: string;
  cotacao: string;
}

export const MinhaCotacaoSet: MinhaCotacao[] = [
  {de: "USD", para: "BRL", cotacao: "Reais"},
  {de: "USD", para: "EUR", cotacao: "Euros"},
  {de: "USD", para: "GBP", cotacao: "Libras Esterlinas"},
  {de: "USD", para: "JPY", cotacao: "Iene Japonês"},
  {de: "USD", para: "CAD", cotacao: "Dólar Canadense"},
  {de: "USD", para: "MXN", cotacao: "Dólar Mexicano"}  
];