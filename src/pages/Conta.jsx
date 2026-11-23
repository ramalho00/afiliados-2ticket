import { AFILIADO, EVENTOS } from '../data/mock.js';
import { Button, Card, PageHeader, TextField } from '../components/ui.jsx';

const AVISOS = [
  { titulo: 'A cada venda', texto: 'Um email quando alguém compra pelo teu link.' },
  { titulo: 'Resumo semanal', texto: 'À segunda-feira, com as vendas da semana.' },
  { titulo: 'Novos eventos', texto: 'Quando a organização publicar um evento novo.' }
];

export default function Conta() {
  const semSubmit = (e) => e.preventDefault();
  const aVenda = EVENTOS.filter((e) => e.aVenda).length;

  return (
    <>
      <PageHeader eyebrow={AFILIADO.organizacao} title="Conta" />

      <div className="flex flex-wrap items-start gap-6">
        <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-6">
          <Card>
            <form onSubmit={semSubmit} aria-labelledby="titulo-dados" className="flex flex-col gap-5">
              <div className="flex flex-col gap-0.5">
                <h2 id="titulo-dados" className="m-0 font-display text-xl font-bold leading-[26px] text-ink">Os teus dados</h2>
                <p className="m-0 text-[13px] leading-[18px] text-ink-muted">O nome e o utilizador são definidos pela organização.</p>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                <TextField label="Nome" defaultValue={AFILIADO.nome} disabled />
                <TextField label="Utilizador" defaultValue={AFILIADO.utilizador} disabled />
                <TextField label="Email" type="email" autoComplete="email" defaultValue={AFILIADO.email} hint="Recebes aqui os avisos de vendas." />
                <TextField label="Telemóvel (opcional)" type="tel" autoComplete="tel" placeholder="9XX XXX XXX" />
              </div>
              <div><Button type="submit">Guardar alterações</Button></div>
            </form>
          </Card>

          <Card>
            <form onSubmit={semSubmit} aria-labelledby="titulo-pass" className="flex flex-col gap-5">
              <h2 id="titulo-pass" className="m-0 font-display text-xl font-bold leading-[26px] text-ink">Palavra-passe</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
                <TextField label="Palavra-passe atual" type="password" autoComplete="current-password" />
                <TextField label="Nova palavra-passe" type="password" autoComplete="new-password" hint="8 caracteres ou mais, com letras e números." />
              </div>
              <div><Button type="submit" variant="secondary">Alterar palavra-passe</Button></div>
            </form>
          </Card>
        </div>

        <div className="flex min-w-0 flex-[2_1_340px] flex-col gap-6">
          <Card>
            <fieldset className="m-0 flex min-w-0 flex-col gap-3.5 border-0 p-0">
              <legend className="mb-3.5 p-0 font-display text-xl font-bold leading-[26px] text-ink">Avisos por email</legend>
              {AVISOS.map((a) => (
                <label key={a.titulo} className="flex cursor-pointer items-start gap-3">
                  <input type="checkbox" defaultChecked className="mt-0.5 h-[18px] w-[18px] flex-none accent-brand" />
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold leading-5 text-ink">{a.titulo}</span>
                    <span className="text-[13px] leading-[18px] text-ink-muted">{a.texto}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          </Card>

          <Card variant="sunken" className="gap-3.5">
            <h2 className="m-0 font-display text-xl font-bold leading-[26px] text-ink">Programa de afiliados</h2>
            <dl className="m-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-4 gap-y-2.5 text-sm leading-5">
              <dt className="text-ink-muted">Organização</dt>
              <dd className="m-0 font-bold text-ink">{AFILIADO.organizacao}</dd>
              <dt className="text-ink-muted">Afiliado desde</dt>
              <dd className="m-0 font-bold text-ink">{AFILIADO.desde}</dd>
              <dt className="text-ink-muted">O teu link</dt>
              <dd className="m-0 font-bold text-ink [overflow-wrap:anywhere]">{AFILIADO.link}</dd>
              <dt className="text-ink-muted">Eventos à venda</dt>
              <dd className="m-0 font-bold text-ink">{aVenda}</dd>
            </dl>
            <p className="m-0 text-[13px] leading-[18px] text-ink-body">Dúvidas sobre o programa ou o teu acesso? Fala diretamente com a organização do evento.</p>
          </Card>
        </div>
      </div>
    </>
  );
}
