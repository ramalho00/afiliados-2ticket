import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const cx = (...c) => c.filter(Boolean).join(' ');

/* Ícones: traço 2px, cantos redondos, currentColor (estilo Lucide) */
const PATHS = {
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  copy: <><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  chat: <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
  qr: <><rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" /><path d="M21 21v.01" /><path d="M12 7v3a2 2 0 0 1-2 2H7" /><path d="M3 12h.01" /><path d="M12 3h.01" /><path d="M12 16v.01" /><path d="M16 12h1" /><path d="M21 12v.01" /><path d="M12 21v-1" /></>,
  wallet: <><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" /><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" /></>,
  ticket: <><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></>,
  bag: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></>,
  lock: <><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />
};

export function Icon({ name, size = 16, strokeWidth = 2, className, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cx('flex-none', className)}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}

/* Logótipo: usa public/logo-2ticket.svg (azul) / logo-2ticket-branco.svg; sem ficheiro, mostra o wordmark em texto */
export function Logo({ white = false, height = 24 }) {
  const [falhou, setFalhou] = useState(false);
  const src = white ? '/logo-2ticket-branco.svg' : '/logo-2ticket.svg';
  if (falhou) {
    return (
      <span
        role="img"
        aria-label="2TICKET"
        className={cx('font-display font-extrabold tracking-tight', white ? 'text-on-brand' : 'text-brand-electric')}
        style={{ fontSize: height, lineHeight: 1 }}
      >
        2TICKET
      </span>
    );
  }
  return <img src={src} alt="2TICKET" style={{ height, width: 'auto' }} onError={() => setFalhou(true)} />;
}

export function Button({ variant = 'primary', size = 'md', block, to, href, className, children, ...rest }) {
  const cls = cx('tt-btn', `tt-btn-${variant}`, size !== 'md' && `tt-btn-${size}`, block && 'tt-btn-block', className);
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}

export function Badge({ tone = 'neutral', dot, children }) {
  return <span className={cx('tt-badge', tone !== 'neutral' && `tt-badge-${tone}`, dot && 'tt-badge-dot')}>{children}</span>;
}

export function Eyebrow({ inverse, children }) {
  return <p className={cx('tt-eyebrow', inverse && 'tt-eyebrow-inverse')}>{children}</p>;
}

export function Card({ variant = 'raised', className, children, ...rest }) {
  return <div className={cx('tt-card', `tt-card-${variant}`, className)} {...rest}>{children}</div>;
}

export function TextField({ label, hint, error, size, className, ...rest }) {
  const id = useId();
  const msg = error || hint;
  return (
    <div className={cx('tt-field', error && 'tt-field-invalid', size === 'lg' && 'tt-field-lg', className)}>
      {label && <label className="tt-field-label" htmlFor={id}>{label}</label>}
      <input
        id={id}
        className="tt-field-input"
        aria-invalid={error ? true : undefined}
        aria-describedby={msg ? `${id}-msg` : undefined}
        {...rest}
      />
      {msg && <span id={`${id}-msg`} className="tt-field-hint">{msg}</span>}
    </div>
  );
}

export function Select({ label, children, className, ...rest }) {
  const id = useId();
  return (
    <div className={cx('tt-field', className)}>
      {label && <label className="tt-field-label" htmlFor={id}>{label}</label>}
      <div className="relative">
        <select id={id} className="tt-field-input" {...rest}>{children}</select>
        <Icon name="chevronDown" className="pointer-events-none absolute right-3 top-3 text-ink-muted" />
      </div>
    </div>
  );
}

export function Alert({ tone = 'info', title, children }) {
  const icon = { info: 'i', success: '✓', warning: '!', danger: '!' }[tone];
  const bg = { info: 'bg-brand-soft', success: 'bg-success-soft', warning: 'bg-warning-soft', danger: 'bg-danger-soft' }[tone];
  const fg = { info: 'bg-brand-text', success: 'bg-success', warning: 'bg-warning', danger: 'bg-danger' }[tone];
  return (
    <div className={cx('tt-alert', bg)} role={tone === 'danger' ? 'alert' : 'status'}>
      <span className={cx('tt-alert-icon', fg)} aria-hidden="true">{icon}</span>
      <div>
        {title && <p className="tt-alert-title">{title}</p>}
        {children && <p className="tt-alert-body">{children}</p>}
      </div>
    </div>
  );
}

export function EventCard({ title, day, month, meta, price, priceLabel, image }) {
  return (
    <article className="tt-event w-full">
      <div className="tt-event-media">
        {image && <img src={image} alt={`Cartaz de ${title}`} />}
        <div className="tt-event-date">
          <span className="tt-event-day">{day}</span>
          <span className="tt-event-month">{month}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-5 pb-5 pt-8">
        <h3 className="m-0 font-display text-xl font-bold leading-[26px] text-ink">{title}</h3>
        {meta && <p className="m-0 text-[13px] font-medium leading-[18px] text-ink-muted">{meta}</p>}
        {price && (
          <div className="mt-4">
            <div className="text-xs text-ink-muted">{priceLabel}</div>
            <div className="font-display text-[22px] font-extrabold leading-none text-ink">{price}</div>
          </div>
        )}
      </div>
    </article>
  );
}

export function Segmented({ label, options, value, onChange }) {
  return (
    <div role="group" aria-label={label} className="tt-seg">
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function PageHeader({ eyebrow, title, children, aside }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
      <div className="flex min-w-0 flex-col gap-2.5">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="m-0 font-display text-[32px] font-bold leading-[38px] text-ink">{title}</h1>
        {children && <p className="m-0 max-w-[640px] text-ink-body">{children}</p>}
      </div>
      {aside}
    </div>
  );
}

/* Copiar para a área de transferência com feedback curto */
export function useCopiar() {
  const [copiado, setCopiado] = useState(null);
  const t = useRef();
  useEffect(() => () => clearTimeout(t.current), []);
  const copiar = (chave, texto) => {
    navigator.clipboard?.writeText(texto).catch(() => {});
    setCopiado(chave);
    clearTimeout(t.current);
    t.current = setTimeout(() => setCopiado(null), 1600);
  };
  return [copiado, copiar];
}

export function PrivacyNote() {
  return (
    <p className="m-0 flex items-center gap-2 text-[13px] leading-[18px] text-ink-muted">
      <Icon name="lock" size={14} />
      Por privacidade, os dados de quem compra não são partilhados com afiliados.
    </p>
  );
}
