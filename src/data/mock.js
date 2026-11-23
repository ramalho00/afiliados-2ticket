// Dados de exemplo do protótipo. Em produção vêm da API 2TICKET
// (vendas atribuídas ao link do afiliado autenticado).

export const AFILIADO = {
  nome: 'Inês Carvalho',
  primeiroNome: 'Inês',
  iniciais: 'IC',
  utilizador: 'inescarvalho',
  email: 'ines.carvalho@exemplo.pt',
  desde: '6 out 2026',
  organizacao: 'Associação de Estudantes',
  link: '2ticket.pt/r/inescarvalho'
};

export const PRECO_GERAL = 8;

// Dia 0 = 1 out 2026 · último dia = 23 nov 2026 (54 dias)
export const N_DIAS = 54;
const zeros = (n) => new Array(n).fill(0);

export const EVENTOS = [
  {
    id: 'neon',
    nome: 'NEON BLOOM',
    data: 'sex, 4 dez · 23:00',
    dia: '04',
    mes: 'dez',
    diaSemana: 'sexta-feira · 23:00',
    aVenda: true,
    mensagem: 'NEON BLOOM · sexta, 4 de dezembro, às 23:00.',
    bilhetesPorDia: zeros(31).concat([0, 0, 1, 0, 1, 0, 0, 1, 2, 0, 0, 1, 0, 1, 0, 0, 2, 1, 0, 0, 2, 1, 1])
  },
  {
    id: 'rewind',
    nome: 'REWIND THE YEARS (35 Anos da AE)',
    data: 'sáb, 12 dez · 22:00',
    dia: '12',
    mes: 'dez',
    diaSemana: 'sábado · 22:00',
    aVenda: true,
    mensagem: 'REWIND THE YEARS, a festa dos 35 anos da AE · sábado, 12 de dezembro, às 22:00.',
    bilhetesPorDia: zeros(31).concat([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, 1, 1, 1])
  },
  {
    id: 'halloween',
    nome: 'HALLOWEEN NIGHT',
    data: 'sáb, 31 out · 23:00',
    dia: '31',
    mes: 'out',
    diaSemana: 'sábado · 23:00',
    aVenda: false,
    mensagem: '',
    bilhetesPorDia: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 0, 2, 0, 0, 1, 0, 3, 2, 2, 1].concat(zeros(23))
  }
];

export const EVENTO_POR_ID = Object.fromEntries(EVENTOS.map((e) => [e.id, e]));

// [dia, hora, nº encomenda, evento, bilhetes] — mais recentes primeiro
export const ENCOMENDAS = [
  [53, '14:31', 104882, 'rewind', 1], [53, '10:07', 104851, 'neon', 1], [52, '22:48', 104790, 'rewind', 1],
  [52, '19:15', 104766, 'neon', 1], [51, '23:02', 104701, 'neon', 2], [51, '17:40', 104673, 'rewind', 1],
  [50, '21:12', 104598, 'rewind', 1], [48, '13:26', 104455, 'neon', 1], [47, '17:04', 103592, 'neon', 2],
  [47, '09:02', 103557, 'rewind', 2], [45, '09:53', 103462, 'rewind', 1], [44, '11:39', 103385, 'neon', 1],
  [43, '18:41', 103325, 'rewind', 1], [42, '19:47', 103217, 'neon', 1], [40, '15:28', 103134, 'rewind', 1],
  [39, '09:38', 103099, 'neon', 2], [38, '20:40', 102990, 'neon', 1], [35, '21:56', 102965, 'neon', 1],
  [33, '10:34', 102877, 'neon', 1], [30, '13:09', 102815, 'halloween', 1], [29, '10:28', 102709, 'halloween', 2],
  [28, '21:11', 102655, 'halloween', 2], [27, '19:39', 102564, 'halloween', 1], [27, '17:30', 102514, 'halloween', 2],
  [25, '11:51', 102414, 'halloween', 1], [22, '18:12', 102333, 'halloween', 2], [19, '17:54', 102267, 'halloween', 1],
  [16, '16:28', 102183, 'halloween', 2], [13, '23:49', 102155, 'halloween', 1], [10, '17:54', 102054, 'halloween', 1],
  [7, '16:55', 101999, 'halloween', 1]
].map(([dia, hora, numero, evento, bilhetes]) => ({ dia, hora, numero, evento, bilhetes }));

export const PERIODOS = {
  '7d': { label: '7 dias', inicio: 47, texto: '17–23 nov 2026', eixo: null, frase: 'nos últimos 7 dias' },
  mes: { label: 'Este mês', inicio: 31, texto: '1–23 nov 2026', eixo: [31, 38, 45, 52], frase: 'em novembro' },
  tudo: { label: 'Tudo', inicio: 0, texto: '1 out – 23 nov 2026', eixo: [0, 14, 31, 45], frase: 'desde 1 out' }
};

export function rotuloDia(i) {
  return i < 31 ? `${i + 1} out` : `${i - 30} nov`;
}

export function fmtInt(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function fmtEur(n) {
  const [i, d] = n.toFixed(2).split('.');
  return `${fmtInt(i)},${d} €`;
}

export function plural(n, um, varios) {
  return `${n} ${n === 1 ? um : varios}`;
}

// Resumo de um período, calculado a partir das encomendas
export function resumoPeriodo(chave, eventoId = 'todos') {
  const per = PERIODOS[chave] ?? PERIODOS.mes;
  const lista = ENCOMENDAS.filter((o) => o.dia >= per.inicio && (eventoId === 'todos' || o.evento === eventoId));
  const bilhetes = lista.reduce((s, o) => s + o.bilhetes, 0);
  return { per, lista, bilhetes, encomendas: lista.length, vendas: bilhetes * PRECO_GERAL };
}

export function totaisEvento(eventoId, desde = 0) {
  const lista = ENCOMENDAS.filter((o) => o.evento === eventoId && o.dia >= desde);
  const bilhetes = lista.reduce((s, o) => s + o.bilhetes, 0);
  return { bilhetes, encomendas: lista.length, vendas: bilhetes * PRECO_GERAL };
}
