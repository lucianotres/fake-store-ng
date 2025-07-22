export const calculaEmCotacao = (original: number, cotacao: number): number =>
  Math.round(original * cotacao * 100) / 100;