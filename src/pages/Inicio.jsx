import { useState } from 'react';
import {
  AFILIADO, ENCOMENDAS, EVENTOS, EVENTO_POR_ID, N_DIAS, PERIODOS, PRECO_GERAL,
  fmtEur, fmtInt, plural, resumoPeriodo, rotuloDia, totaisEvento
} from '../data/mock.js';
import { Badge, Button, Card, Eyebrow, Icon, PageHeader, PrivacyNote, Segmented, useCopiar } from '../components/ui.jsx';

const OPCOES_PERIODO = Object.entries(PERIODOS).map(([value, p]) => ({ value, label: p.label }));

export default function Inicio() {
  const [periodo, setPeriodo] = useState('mes');
  const [copiado, copiar] = useCopiar();
  const { per, bilhetes, encomendas, vendas } = resumoPeriodo(periodo);

  const urlCompleto = `https://${AFILIADO.link}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`Bilhetes para as festas da ${AFILIADO.organizacao}: ${urlCompleto}`)}`;

  const porEvento = EVENTOS
    .map((ev) => ({ ev, tot: totaisEvento(ev.id, per.inicio) }))
    .filter(({ ev, tot }) => ev.aVenda || tot.bilhetes > 0);

  return (
    <>
      <PageHeader
        eyebrow={AFILIADO.organizacao}
        title={`Olá, ${AFILIADO.primeiroNome}`}
        aside={<Segmented label="Período" options={OPCOES_PERIODO} value={periodo} onChange={setPeriodo} />}
      >
        Vendas feitas através do teu link · {per.texto}
      </PageHeader>

      {/* O meu link (geral, serve para todos os eventos) */}
      <Card variant="brand">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2">
              <Eyebrow inverse>O meu link</Eyebrow>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(255,255,255,0.18)] px-2.5 py-[3px] text-xs font-bold leading-4">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-on-brand" />
                Ativo
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <Icon name="link" size={24} />
              <span className="min-w-0 font-display text-[28px] font-bold leading-[34px] [overflow-wrap:anywhere]">{AFILIADO.link}</span>
            </div>
            <p className="m-0 text-sm leading-5">
              Um só link para todos os eventos da {AFILIADO.organizacao}. Cada compra feita a partir dele conta para ti.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button variant="secondary" onClick={() => copiar('link', urlCompleto)}>
              <Icon name={copiado === 'link' ? 'check' : 'copy'} />
              {copiado === 'link' ? 'Link copiado' : 'Copiar link'}
            </Button>
            <Button variant="secondary" href={whatsapp} target="_blank" rel="noopener noreferrer">
              <Icon name="chat" />
              WhatsApp
            </Button>
            <Button variant="secondary">
              <Icon name="qr" />
              QR code
            </Button>
          </div>
        </div>
      </Card>

      {/* Totais */}
      <section aria-label="Resumo" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5">
        <Kpi icon="wallet" titulo="Vendas" valor={fmtEur(vendas)} nota="pelo teu link" destaque />
        <Kpi icon="ticket" titulo="Bilhetes" valor={fmtInt(bilhetes)} nota="vendidos pelo teu link" />
        <Kpi icon="bag" titulo="Encomendas" valor={fmtInt(encomendas)} nota="feitas pelo teu link" />
      </section>

      <GraficoDiario per={per} />

      {/* Por evento */}
      <section aria-labelledby="titulo-eventos" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <h2 id="titulo-eventos" className="m-0 font-display text-2xl font-bold leading-[30px] text-ink">Por evento</h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-[13px] text-ink-muted">{per.texto}</span>
            <Button variant="ghost" size="sm" to="/eventos">Ver eventos</Button>
          </div>
        </div>
        {porEvento.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-5">
            {porEvento.map(({ ev, tot }) => (
              <Card key={ev.id} className="gap-3.5">
                <div className="flex items-center justify-between gap-2">
                  {ev.aVenda ? <Badge tone="success" dot>À venda</Badge> : <Badge>Terminado</Badge>}
                  <span className="whitespace-nowrap text-xs leading-4 text-ink-muted">{ev.data}</span>
                </div>
                <h3 className="m-0 font-display text-lg font-bold leading-6 text-ink">{ev.nome}</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Tile label="Vendas" valor={fmtEur(tot.vendas)} destaque />
                  <Tile label="Bilhetes" valor={fmtInt(tot.bilhetes)} />
                  <Tile label="Encomendas" valor={fmtInt(tot.encomendas)} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="m-0 rounded-lg bg-surface-sunken p-6 text-center text-ink-muted">Ainda sem vendas neste período.</p>
        )}
      </section>

      {/* Últimas vendas */}
      <section aria-labelledby="titulo-ultimas" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <h2 id="titulo-ultimas" className="m-0 font-display text-2xl font-bold leading-[30px] text-ink">Últimas vendas</h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="text-[13px] text-ink-muted">Atualizado às 15:34</span>
            <Button variant="ghost" size="sm" to="/vendas">Ver todas as vendas</Button>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,260px),1fr))] gap-4">
          {ENCOMENDAS.slice(0, 8).map((o) => (
            <Card key={o.numero} className="gap-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold leading-4 text-ink-muted">{rotuloDia(o.dia)} · {o.hora}</span>
                <span className="font-mono text-xs leading-4 text-ink-muted">#2T-{o.numero}</span>
              </div>
              <span className="text-sm font-bold leading-5 text-ink">{EVENTO_POR_ID[o.evento].nome}</span>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] leading-[18px] text-ink-body">{plural(o.bilhetes, 'bilhete', 'bilhetes')} · Geral</span>
                <span className="whitespace-nowrap font-display text-xl font-extrabold leading-6 text-ink">{fmtEur(o.bilhetes * PRECO_GERAL)}</span>
              </div>
            </Card>
          ))}
        </div>
        <PrivacyNote />
      </section>
    </>
  );
}

function Kpi({ icon, titulo, valor, nota, destaque }) {
  return (
    <Card className="gap-2.5">
      <div className="flex items-center gap-2.5 text-[13px] font-semibold leading-[18px] text-ink-muted">
        <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-brand-soft text-brand-text">
          <Icon name={icon} />
        </span>
        {titulo}
      </div>
      <span className={`whitespace-nowrap font-display text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.1] ${destaque ? 'text-brand-text' : 'text-ink'}`}>
        {valor}
      </span>
      <span className="text-[13px] leading-[18px] text-ink-muted">{nota}</span>
    </Card>
  );
}

function Tile({ label, valor, destaque }) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 rounded-md bg-surface-sunken px-3 py-2.5">
      <span className="text-xs leading-4 text-ink-muted">{label}</span>
      <span className={`whitespace-nowrap font-display text-lg font-bold leading-6 ${destaque ? 'text-brand-text' : 'text-ink'}`}>{valor}</span>
    </div>
  );
}

function GraficoDiario({ per }) {
  const [hover, setHover] = useState(null);
  const dias = [];
  for (let i = per.inicio; i < N_DIAS; i++) {
    dias.push({ i, t: EVENTOS.reduce((s, ev) => s + ev.bilhetesPorDia[i], 0) });
  }
  const total = dias.reduce((s, d) => s + d.t, 0);
  const maxDia = Math.max(1, ...dias.map((d) => d.t));
  const yMax = maxDia <= 2 ? 2 : maxDia % 2 === 0 ? maxDia : maxDia + 1;
  const n = dias.length;

  return (
    <Card className="gap-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="m-0 font-display text-xl font-bold leading-[26px] text-ink">Bilhetes por dia</h2>
        <span className="text-[13px] text-ink-muted">{per.texto} · passa o rato sobre as barras</span>
      </div>
      <div role="img" aria-label={`Bilhetes vendidos por dia, ${per.texto}: ${total} no total, máximo de ${maxDia} num só dia.`} className="flex flex-col gap-2">
        <div className="flex h-[200px] gap-2">
          <div aria-hidden="true" className="relative w-5 flex-none text-right text-[11px] leading-[14px] text-ink-muted">
            <span className="absolute right-0 top-0 -translate-y-1/2">{yMax}</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2">{yMax / 2}</span>
            <span className="absolute bottom-0 right-0 translate-y-1/2">0</span>
          </div>
          <div className="relative min-w-0 flex-auto rounded-md bg-surface-sunken px-2">
            <div className="absolute inset-y-0 left-2 right-2 flex gap-0.5" onMouseLeave={() => setHover(null)}>
              {dias.map((d, k) => {
                const h = `${((d.t / yMax) * 100).toFixed(2)}%`;
                const pos = k < 3 ? 'left-0' : k > n - 4 ? 'right-0' : 'left-1/2 -translate-x-1/2';
                return (
                  <div
                    key={d.i}
                    onMouseEnter={() => setHover(k)}
                    className="relative flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                  >
                    <div
                      className={`w-full max-w-9 rounded-t-[4px] transition-colors ${hover === k ? 'bg-brand-hover' : 'bg-brand'}`}
                      style={{ height: h }}
                    />
                    {hover === k && (
                      <div
                        className={`pointer-events-none absolute z-10 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-semibold leading-4 text-white shadow-lg ${pos}`}
                        style={{ bottom: `calc(${h} + 8px)` }}
                      >
                        {rotuloDia(d.i)} · {plural(d.t, 'bilhete', 'bilhetes')} · {fmtEur(d.t * PRECO_GERAL)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="ml-9 mr-2 flex h-4 gap-0.5">
          {dias.map((d) => (
            <div key={d.i} className="flex min-w-0 flex-1 justify-center overflow-visible">
              <span className="whitespace-nowrap text-[11px] leading-4 text-ink-muted">
                {!per.eixo || per.eixo.includes(d.i) ? rotuloDia(d.i) : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
