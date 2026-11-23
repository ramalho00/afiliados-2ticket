import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AFILIADO } from '../data/mock.js';
import { Button, Eyebrow, Icon, Logo, TextField } from '../components/ui.jsx';

export default function PrimeiroAcesso() {
  const navigate = useNavigate();
  const [nova, setNova] = useState('');
  const [repete, setRepete] = useState('');

  const regras = [
    { texto: 'Pelo menos 8 caracteres', ok: nova.length >= 8 },
    { texto: 'Pelo menos uma letra e um número', ok: /[a-zA-Z]/.test(nova) && /\d/.test(nova) },
    { texto: 'As duas palavras-passe são iguais', ok: nova.length > 0 && nova === repete }
  ];
  const valida = regras.every((r) => r.ok);

  const guardar = (e) => {
    e.preventDefault();
    if (valida) navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-10 bg-surface px-4 py-12">
      <Logo height={26} />
      <form
        onSubmit={guardar}
        aria-labelledby="titulo-primeiro"
        className="flex w-full max-w-[480px] flex-col gap-5 rounded-lg border border-line bg-surface-raised p-[clamp(24px,5vw,40px)] shadow-sm"
      >
        <div className="flex flex-col gap-2.5">
          <Eyebrow>Primeiro acesso</Eyebrow>
          <h1 id="titulo-primeiro" className="m-0 font-display text-[32px] font-bold leading-[38px] text-ink">Escolhe a tua palavra-passe</h1>
          <p className="m-0 text-ink-body">
            Olá, {AFILIADO.primeiroNome}. A palavra-passe que recebeste da organização é temporária. Escolhe uma só tua para continuares.
          </p>
        </div>

        <TextField label="Nova palavra-passe" type="password" size="lg" autoComplete="new-password" value={nova} onChange={(e) => setNova(e.target.value)} />
        <TextField
          label="Repete a palavra-passe"
          type="password"
          size="lg"
          autoComplete="new-password"
          value={repete}
          onChange={(e) => setRepete(e.target.value)}
          error={repete && repete !== nova ? 'As palavras-passe não coincidem.' : undefined}
        />

        <ul aria-label="Requisitos da palavra-passe" className="m-0 flex list-none flex-col gap-2.5 rounded-md bg-surface-sunken p-4">
          {regras.map((r) => (
            <li key={r.texto} className={`flex items-center gap-2.5 text-sm leading-5 ${r.ok ? 'text-ink' : 'text-ink-muted'}`}>
              {r.ok ? (
                <span aria-hidden="true" className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-success text-white">
                  <Icon name="check" size={12} strokeWidth={3} />
                </span>
              ) : (
                <span aria-hidden="true" className="h-5 w-5 flex-none rounded-full border-2 border-line-strong" />
              )}
              <span>{r.texto}</span>
              <span className="sr-only">{r.ok ? '(cumprido)' : '(por cumprir)'}</span>
            </li>
          ))}
        </ul>

        <Button type="submit" size="lg" block disabled={!valida}>Guardar e entrar</Button>
      </form>
      <p className="m-0 max-w-[480px] text-center text-[13px] leading-[18px] text-ink-muted">Podes mudar a palavra-passe sempre que quiseres em Conta.</p>
    </div>
  );
}
