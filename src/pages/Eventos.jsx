import { useId, useState } from 'react';
import { AFILIADO, EVENTOS, fmtEur, fmtInt, totaisEvento } from '../data/mock.js';
import { Alert, Badge, Button, Card, EventCard, Icon, PageHeader, Segmented, useCopiar } from '../components/ui.jsx';

export default function Eventos() {
  const [filtro, setFiltro] = useState('todos');
  const [copiado, copiar] = useCopiar();
  const nAtivos = EVENTOS.filter((e) => e.aVenda).length;
  const opcoes = [
    { value: 'ativos', label: `À venda · ${nAtivos}` },
    { value: 'terminados', label: `Terminados · ${EVENTOS.length - nAtivos}` },
    { value: 'todos', label: `Todos · ${EVENTOS.length}` }
  ];
  const lista = EVENTOS.filter((e) => filtro === 'todos' || (filtro === 'ativos' ? e.aVenda : !e.aVenda));

  return (
    <>
      <PageHeader
        eyebrow={AFILIADO.organizacao}
        title="Eventos"
        aside={<Segmented label="Mostrar eventos" options={opcoes} value={filtro} onChange={setFiltro} />}
      >
        Os eventos onde o teu link conta. O link é o mesmo para todos; usa as mensagens prontas para divulgar cada um.
      </PageHeader>

      <Alert title="Novos eventos entram sozinhos">
        Quando a organização publicar um evento novo, as compras feitas pelo teu link passam a contar também para ele.
      </Alert>

      <div className="flex flex-col gap-6">
        {lista.map((ev) => (
          <LinhaEvento key={ev.id} ev={ev} copiado={copiado} copiar={copiar} />
        ))}
        {lista.length === 0 && (
          <p className="m-0 rounded-lg bg-surface-sunken p-8 text-center text-ink-muted">Sem eventos nesta lista.</p>
        )}
      </div>
    </>
  );
}

function LinhaEvento({ ev, copiado, copiar }) {
  const id = useId();
  const tot = totaisEvento(ev.id);
  const msg = `${ev.mensagem} Bilhetes aqui: https://${AFILIADO.link}`;
  const chave = `msg-${ev.id}`;

  return (
    <article aria-label={ev.nome} className="flex flex-wrap items-stretch gap-5">
      <div className="flex min-w-0 flex-[0_1_300px]">
        <EventCard title={ev.nome} day={ev.dia} month={ev.mes} meta={ev.diaSemana} price="8,00 €" priceLabel="Bilhete geral" />
      </div>
      <Card className="flex-[1_1_460px] gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {ev.aVenda ? <Badge tone="success" dot>À venda</Badge> : <Badge>Evento terminado</Badge>}
          <span className="text-xs leading-4 text-ink-muted">{ev.data}</span>
        </div>

        {ev.aVenda ? (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-[0.1em] text-ink-muted">Mensagem pronta a partilhar</label>
            <textarea id={id} className="tt-field-input min-h-16" readOnly rows={2} value={msg} />
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={() => copiar(chave, msg)}>
                <Icon name={copiado === chave ? 'check' : 'copy'} size={14} />
                {copiado === chave ? 'Mensagem copiada' : 'Copiar mensagem'}
              </Button>
              <Button variant="secondary" size="sm" href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer">
                <Icon name="chat" size={14} />
                Partilhar no WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex min-h-10 items-center gap-2.5 rounded-md bg-surface-sunken px-3 py-2 text-[13px] leading-[18px] text-ink-muted">
            <Icon name="lock" />
            O evento já terminou. As vendas feitas pelo teu link continuam contabilizadas.
          </div>
        )}

        <div className="grid grid-cols-3 gap-2">
          <Tile label="Bilhetes" valor={fmtInt(tot.bilhetes)} />
          <Tile label="Vendas" valor={fmtEur(tot.vendas)} destaque />
          <Tile label="Encomendas" valor={fmtInt(tot.encomendas)} />
        </div>
      </Card>
    </article>
  );
}

function Tile({ label, valor, destaque }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 rounded-md bg-surface-sunken px-3 py-2.5">
      <span className="text-xs leading-4 text-ink-muted">{label}</span>
      <span className={`whitespace-nowrap font-display text-[22px] font-bold leading-7 ${destaque ? 'text-brand-text' : 'text-ink'}`}>{valor}</span>
    </div>
  );
}
