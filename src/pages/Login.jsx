import { useNavigate } from 'react-router-dom';
import { AFILIADO } from '../data/mock.js';
import { Button, Eyebrow, Icon, Logo, TextField } from '../components/ui.jsx';

const PONTOS = ['Vendas atualizadas ao minuto', 'Um só link para todos os eventos', 'Os dados de quem compra ficam protegidos'];

export default function Login() {
  const navigate = useNavigate();
  const entrar = (e) => {
    e.preventDefault();
    navigate('/primeiro-acesso');
  };

  return (
    <div className="flex min-h-screen flex-wrap bg-surface">
      <section
        aria-label="Área de afiliados 2TICKET"
        className="flex flex-[1_1_520px] flex-col justify-between gap-12 bg-brand px-[clamp(24px,5vw,72px)] py-12 text-on-brand"
      >
        <Logo white height={28} />
        <div className="flex max-w-[560px] flex-col gap-5">
          <Eyebrow inverse>Área de afiliados</Eyebrow>
          <h1 className="m-0 font-display text-[44px] font-extrabold leading-[48px]">Partilha o teu link. Acompanha cada bilhete.</h1>
          <p className="m-0 text-[17px] leading-[26px]">Vê em tempo real as vendas feitas pelo teu link, evento a evento.</p>
          <ul className="m-0 mt-2 flex list-none flex-col gap-3 p-0 text-[15px] font-semibold">
            {PONTOS.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[rgba(255,255,255,0.18)]">
                  <Icon name="check" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <p className="m-0 text-[13px] leading-[18px]">afiliados.2ticket.pt · bilhética 2TICKET</p>
      </section>

      <section className="flex flex-[1_1_480px] items-center justify-center px-6 py-12">
        <form onSubmit={entrar} aria-labelledby="titulo-login" className="flex w-full max-w-[400px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 id="titulo-login" className="m-0 font-display text-[32px] font-bold leading-[38px] text-ink">Entrar</h2>
            <p className="m-0 text-ink-body">Usa o utilizador e a palavra-passe que recebeste da organização do evento.</p>
          </div>
          <TextField label="Utilizador" size="lg" autoComplete="username" defaultValue={AFILIADO.utilizador} required />
          <TextField
            label="Palavra-passe"
            type="password"
            size="lg"
            autoComplete="current-password"
            defaultValue="k7pm-q2xa-9fhr"
            hint="Esqueceste-te? Pede uma nova à organização do evento."
            required
          />
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-body">
            <input type="checkbox" defaultChecked className="h-[18px] w-[18px] accent-brand" />
            Manter sessão iniciada neste dispositivo
          </label>
          <Button type="submit" size="lg" block>Entrar</Button>
          <p className="m-0 text-[13px] leading-[18px] text-ink-muted">Primeira vez? Depois de entrares, escolhes uma palavra-passe nova.</p>
        </form>
      </section>
    </div>
  );
}
