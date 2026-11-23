import { useState } from 'react';
import { EVENTOS, EVENTO_POR_ID, PERIODOS, PRECO_GERAL, fmtEur, fmtInt, resumoPeriodo, rotuloDia, AFILIADO } from '../data/mock.js';
import { Button, Card, Icon, PageHeader, PrivacyNote, Segmented, Select } from '../components/ui.jsx';

const POR_PAGINA = 12;
const OPCOES_PERIODO = Object.entries(PERIODOS).map(([value, p]) => ({ value, label: p.label }));

export default function Vendas() {
  const [evento, setEvento] = useState('todos');
  const [periodo, setPeriodo] = useState('tudo');
  const [pagina, setPagina] = useState(0);

  const { per, lista, bilhetes, encomendas, vendas } = resumoPeriodo(periodo, evento);
  const paginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
  const p = Math.min(pagina, paginas - 1);
  const de = p * POR_PAGINA;
  const ate = Math.min(lista.length, de + POR_PAGINA);
  const linhas = lista.slice(de, ate);

  return (
    <>
      <PageHeader
        eyebrow={AFILIADO.organizacao}
        title="Vendas"
        aside={
          <Button variant="secondary">
            <Icon name="download" />
            Exportar CSV
          </Button>
        }
      >
        Todas as compras feitas através do teu link.
      </PageHeader>

      <section aria-label="Filtros" className="flex flex-wrap items-end gap-4 rounded-md border border-line bg-surface-raised p-4">
        <Select
          label="Evento"
          className="flex-[1_1_260px]"
          value={evento}
          onChange={(e) => { setEvento(e.target.value); setPagina(0); }}
        >
          <option value="todos">Todos os eventos</option>
          {EVENTOS.map((ev) => <option key={ev.id} value={ev.id}>{ev.nome}</option>)}
        </Select>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-semibold leading-5 text-ink">Período</span>
          <Segmented label="Período" options={OPCOES_PERIODO} value={periodo} onChange={(v) => { setPeriodo(v); setPagina(0); }} />
        </div>
      </section>

      <section aria-label="Totais" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
        <Total titulo={`Vendas ${per.frase}`} valor={fmtEur(vendas)} destaque />
        <Total titulo="Bilhetes" valor={fmtInt(bilhetes)} />
        <Total titulo="Encomendas" valor={fmtInt(encomendas)} />
      </section>

      <section aria-label="Lista de vendas" className="flex flex-col gap-3">
        {linhas.length > 0 ? (
          <div className="overflow-x-auto rounded-md border border-line bg-surface-raised">
            <table className="w-full border-collapse text-[13px] leading-[18px]">
              <caption className="sr-only">Vendas pelo teu link</caption>
              <thead>
                <tr className="bg-surface-sunken text-left text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">
                  <th scope="col" className="whitespace-nowrap p-3">Data</th>
                  <th scope="col" className="whitespace-nowrap p-3">Encomenda</th>
                  <th scope="col" className="whitespace-nowrap p-3">Evento</th>
                  <th scope="col" className="whitespace-nowrap p-3">Tipo de bilhete</th>
                  <th scope="col" className="whitespace-nowrap p-3 text-right">Bilhetes</th>
                  <th scope="col" className="whitespace-nowrap p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {linhas.map((o) => (
                  <tr key={o.numero} className="text-ink-body hover:bg-brand-soft">
                    <td className="whitespace-nowrap border-t border-line p-3">{rotuloDia(o.dia)} · {o.hora}</td>
                    <td className="whitespace-nowrap border-t border-line p-3 font-mono">#2T-{o.numero}</td>
                    <td className="whitespace-nowrap border-t border-line p-3 font-semibold text-ink">{EVENTO_POR_ID[o.evento].nome}</td>
                    <td className="whitespace-nowrap border-t border-line p-3">Geral</td>
                    <td className="whitespace-nowrap border-t border-line p-3 text-right tabular-nums">{o.bilhetes}</td>
                    <td className="whitespace-nowrap border-t border-line p-3 text-right font-bold tabular-nums text-ink">{fmtEur(o.bilhetes * PRECO_GERAL)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="m-0 rounded-md bg-surface-sunken p-8 text-center text-ink-muted">Sem vendas para estes filtros.</p>
        )}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[13px] text-ink-muted" aria-live="polite">
            {lista.length > 0 ? `A mostrar ${de + 1}–${ate} de ${lista.length} encomendas` : '0 encomendas'}
          </span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled={p === 0} onClick={() => setPagina(p - 1)}>Anterior</Button>
            <Button variant="secondary" size="sm" disabled={p >= paginas - 1} onClick={() => setPagina(p + 1)}>Seguinte</Button>
          </div>
        </div>
        <PrivacyNote />
      </section>
    </>
  );
}

function Total({ titulo, valor, destaque }) {
  return (
    <Card className="gap-1.5">
      <span className="text-[13px] font-semibold leading-[18px] text-ink-muted">{titulo}</span>
      <span className={`whitespace-nowrap font-display text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.1] ${destaque ? 'text-brand-text' : 'text-ink'}`}>{valor}</span>
    </Card>
  );
}
