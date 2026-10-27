import { Outlet, Link, useLocation } from '@tanstack/react-router';
import { useState } from 'react';

const ICONS: Record<string, string> = {
  '/_authenticated/dashboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>',
  '/_authenticated/customers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  '/_authenticated/forms': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  '/_authenticated/follow-ups': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
  '/_authenticated/inbox': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
};

function NavItem({ to, label, collapsed, onClick }: { to: string; label: string; collapsed: boolean; onClick?: () => void }) {
  const icon = ICONS[to];
  return (
    <Link to={to} className={`sidebar-link ${collapsed ? 'sidebar-link--icon' : ''}`} title={label} onClick={onClick}>
      {collapsed && icon ? <span className="sidebar-icon" dangerouslySetInnerHTML={{ __html: icon }} /> : null}
      {!collapsed && <span className="sidebar-text">{label}</span>}
    </Link>
  );
}

export default function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (to: string) => location.pathname === to || location.pathname.startsWith(to + '/');

  const handleNavClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <div className="app">
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''} ${collapsed ? 'sidebar--collapsed' : ''}`}>
        <div className="sidebar-brand">
          <img src="/logomainter.png" alt="Mainter" className={`logo ${collapsed ? 'logo--brandmark' : ''}`} />
        </div>
        <nav className="sidebar-nav">
          <NavItem to="/_authenticated/dashboard" label="Tablero" collapsed={collapsed} onClick={handleNavClick} />
          <NavItem to="/_authenticated/customers" label="Clientes" collapsed={collapsed} onClick={handleNavClick} />
          <NavItem to="/_authenticated/forms" label="Formularios" collapsed={collapsed} onClick={handleNavClick} />
          <NavItem to="/_authenticated/follow-ups" label="Seguimientos" collapsed={collapsed} onClick={handleNavClick} />
          <NavItem to="/_authenticated/inbox" label="Bandeja" collapsed={collapsed} onClick={handleNavClick} />
          <Link to="/login" className={`sidebar-link ${collapsed ? 'sidebar-link--icon' : ''} sidebar-link--muted`} title="Salir" onClick={handleNavClick}>
            {collapsed ? <span className="sidebar-icon" dangerouslySetInnerHTML={{ __html: '<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><polyline points=\"16 17 21 12 16 7\"/><line x1=\"21\" y1=\"12\" x2=\"9\" y2=\"12\"/></svg>' }} /> : <span className="sidebar-text">Salir</span>}
          </Link>
        </nav>
        <button className="sidebar-toggle" onClick={() => setCollapsed((v) => !v)} aria-label={collapsed ? 'Expandir menú' : 'Contraer menú'}>
          {collapsed ? (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          ) : (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          )}
        </button>
      </aside>
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}
      <div className={`content ${collapsed ? 'content--collapsed' : ''}`}>
        <header className="topbar">
          <div className="topbar-left">
            <img src="/mainter-header.webp" alt="Mainter" className="header-banner" />
          </div>
          <button className="topbar-menu" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">☰</button>
        </header>
        <main className="main">
          <Outlet />
        </main>
        <nav className="bottom-nav" aria-label="Acciones principales">
          <Link to="/_authenticated/dashboard" className={`bottom-link ${isActive('/_authenticated/dashboard') ? 'bottom-link--active' : ''}`}>Inicio</Link>
          <Link to="/_authenticated/customers" className={`bottom-link ${isActive('/_authenticated/customers') ? 'bottom-link--active' : ''}`}>Clientes</Link>
          <Link to="/_authenticated/forms" className={`bottom-link ${isActive('/_authenticated/forms') ? 'bottom-link--active' : ''}`}>Formularios</Link>
          <Link to="/_authenticated/inbox" className={`bottom-link ${isActive('/_authenticated/inbox') ? 'bottom-link--active' : ''}`}>Bandeja</Link>
        </nav>
      </div>
    </div>
  );
}
