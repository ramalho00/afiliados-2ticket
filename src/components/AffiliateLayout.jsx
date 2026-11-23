import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AFILIADO } from '../data/mock.js';
import { Icon, Logo } from './ui.jsx';

const TABS = [
  { to: '/', label: 'Início', end: true },
  { to: '/eventos', label: 'Eventos' },
  { to: '/vendas', label: 'Vendas' },
  { to: '/conta', label: 'Conta' }
];

export default function AffiliateLayout() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-line bg-surface-raised">
        <div className="mx-auto max-w-[1280px] px-[clamp(16px,4vw,40px)]">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link to="/" aria-label="Início — área de afiliados" className="flex items-center gap-3.5 text-ink no-underline">
              <Logo height={22} />
              <span aria-hidden="true" className="h-6 w-px bg-line" />
              <span className="text-sm font-bold leading-5">Afiliados</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link
                to="/conta"
                aria-label={`Conta de ${AFILIADO.nome}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft font-display text-[13px] font-extrabold text-brand-text no-underline"
              >
                {AFILIADO.iniciais}
              </Link>
              <button
                type="button"
                aria-label="Terminar sessão"
                onClick={() => navigate('/login')}
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-line bg-transparent text-ink-muted hover:border-brand-line hover:bg-brand-soft"
              >
                <Icon name="logout" />
              </button>
            </div>
          </div>
          <nav aria-label="Área do afiliado" className="-mb-px flex gap-6 overflow-x-auto">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  [
                    'flex h-12 flex-none items-center whitespace-nowrap border-b-[3px] px-0.5 text-sm leading-5 no-underline',
                    isActive ? 'border-brand font-bold text-brand-text' : 'border-transparent font-semibold text-ink-muted hover:text-ink'
                  ].join(' ')
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-[1280px] flex-col gap-7 px-[clamp(16px,4vw,40px)] pb-16 pt-8">
        <Outlet />
      </main>
    </div>
  );
}
