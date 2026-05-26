import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-container">
      <!-- Admin Navbar -->
      <nav class="navbar">
        <div class="logo-group">
          <span class="logo-icon">🪐</span>
          <span class="logo-text">MrsApp Admin Deck</span>
        </div>
        <div class="user-menu">
          <span class="status-indicator online"></span>
          <span class="user-name">Hola, {{ authService.currentUser()?.name }}</span>
          <button (click)="onLogout()" class="btn-logout btn-squishy">Cerrar Cabina</button>
        </div>
      </nav>

      <main class="dashboard-content">
        <!-- Header -->
        <header class="content-header">
          <h1>Consola de Control Estelar 🌌</h1>
          <p>Bienvenido al puente de mandos. Administra las lecciones, los alumnos y revisa las métricas de aprendizaje de la academia.</p>
        </header>

        <!-- Metrics Dashboard -->
        <section class="metrics-grid">
          <!-- Alumnos Activos -->
          <div class="metric-card cyan">
            <div class="metric-info">
              <span class="metric-label">Rockstars Activos</span>
              <h2 class="metric-value">1,248</h2>
              <p class="metric-subtext">📈 +12% esta semana</p>
            </div>
            <div class="metric-icon">👥</div>
          </div>

          <!-- XP Generado -->
          <div class="metric-card pink">
            <div class="metric-info">
              <span class="metric-label">XP Total Generado</span>
              <h2 class="metric-value">458.2k</h2>
              <p class="metric-subtext">⭐ 12,430 estrellas obtenidas</p>
            </div>
            <div class="metric-icon">✨</div>
          </div>

          <!-- Clases de Hoy -->
          <div class="metric-card violet">
            <div class="metric-info">
              <span class="metric-label">Misiones Completadas</span>
              <h2 class="metric-value">842</h2>
              <p class="metric-subtext">🎵 94% tasa de éxito</p>
            </div>
            <div class="metric-icon">🏆</div>
          </div>
        </section>

        <!-- Interactive Control Panel -->
        <section class="control-panel">
          <div class="panel-header">
            <h2>⚙️ Configuración de Planetas Musicales (Módulos)</h2>
          </div>
          
          <div class="table-container">
            <table class="premium-table">
              <thead>
                <tr>
                  <th>Módulo</th>
                  <th>Tutor</th>
                  <th>Alumnos</th>
                  <th>Dificultad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="bold">Cuerdas Espaciales</td>
                  <td>Roxi la Guitarra</td>
                  <td>612 niños</td>
                  <td><span class="badge easy">Fácil</span></td>
                  <td><button (click)="simulateEdit('Cuerdas Espaciales')" class="btn-action">Ajustar</button></td>
                </tr>
                <tr>
                  <td class="bold">Teclas del Cosmos</td>
                  <td>Leo el Teclado</td>
                  <td>420 niños</td>
                  <td><span class="badge medium">Medio</span></td>
                  <td><button (click)="simulateEdit('Teclas del Cosmos')" class="btn-action">Ajustar</button></td>
                </tr>
                <tr>
                  <td class="bold">Ritmo de Supernova</td>
                  <td>Bongo el Tambor</td>
                  <td>216 niños</td>
                  <td><span class="badge hard">Difícil</span></td>
                  <td><button (click)="simulateEdit('Ritmo de Supernova')" class="btn-action">Ajustar</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .admin-container {
      min-height: 100vh;
      color: #ffffff;
      padding-bottom: 4rem;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 2rem;
      background: rgba(5, 3, 12, 0.75);
      backdrop-filter: blur(16px);
      border-bottom: 2px solid var(--glass-border);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .logo-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .logo-icon {
        font-size: 1.8rem;
        animation: spin-planet 8s linear infinite;
      }
      .logo-text {
        font-family: var(--font-kids-heading);
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        background: linear-gradient(135deg, var(--color-primary-violet) 0%, var(--color-accent-pink) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .status-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;

      &.online {
        background: var(--color-success-lime);
        box-shadow: 0 0 10px var(--color-success-lime);
        animation: pulse 2s infinite;
      }
    }

    .user-name {
      font-weight: 600;
      color: #e2e8f0;
      font-size: 0.95rem;
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.15);
      border: 1.5px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      padding: 0.5rem 1.2rem;
      border-radius: 12px;
      font-family: var(--font-kids-heading);
      font-size: 0.9rem;

      &:hover {
        background: #ef4444;
        color: white;
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
      }
    }

    .dashboard-content {
      padding: 3rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .content-header {
      margin-bottom: 3.5rem;

      h1 {
        font-family: var(--font-kids-heading);
        font-size: 2.8rem;
        margin-bottom: 0.5rem;
        letter-spacing: -0.01em;
      }
      p {
        color: #94a3b8;
        font-size: 1.15rem;
        line-height: 1.6;
        max-width: 800px;
      }
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
    }

    .metric-card {
      background: var(--glass-bg);
      border: 2px solid var(--glass-border);
      border-radius: 24px;
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--glass-shadow);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        transform: translateY(-6px);
      }

      &.cyan {
        &:hover {
          border-color: var(--color-secondary-cyan);
          box-shadow: 0 0 24px var(--color-secondary-glow);
        }
        .metric-icon { color: var(--color-secondary-cyan); }
      }
      &.pink {
        &:hover {
          border-color: var(--color-accent-pink);
          box-shadow: 0 0 24px var(--color-accent-glow);
        }
        .metric-icon { color: var(--color-accent-pink); }
      }
      &.violet {
        &:hover {
          border-color: var(--color-primary-violet);
          box-shadow: 0 0 24px var(--color-primary-glow);
        }
        .metric-icon { color: var(--color-primary-violet); }
      }
    }

    .metric-info {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .metric-label {
      font-family: var(--font-kids-heading);
      font-size: 0.95rem;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 600;
    }

    .metric-value {
      font-family: var(--font-kids-heading);
      font-size: 2.8rem;
      font-weight: 700;
      color: white;
    }

    .metric-subtext {
      font-size: 0.85rem;
      color: #94a3b8;
    }

    .metric-icon {
      font-size: 3rem;
      opacity: 0.9;
    }

    .control-panel {
      background: var(--glass-bg);
      border: 2px solid var(--glass-border);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: var(--glass-shadow);
    }

    .panel-header {
      margin-bottom: 2rem;

      h2 {
        font-family: var(--font-kids-heading);
        font-size: 1.6rem;
        color: white;
      }
    }

    .table-container {
      overflow-x: auto;
    }

    .premium-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;

      th {
        font-family: var(--font-kids-heading);
        font-weight: 600;
        font-size: 1rem;
        color: #94a3b8;
        padding: 1rem;
        border-bottom: 2px solid rgba(255, 255, 255, 0.08);
      }

      td {
        padding: 1.25rem 1rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        color: #cbd5e1;
        font-size: 0.95rem;

        &.bold {
          font-weight: 600;
          color: white;
        }
      }
    }

    .badge {
      font-family: var(--font-kids-heading);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.6rem;
      border-radius: 6px;

      &.easy {
        background: rgba(34, 197, 94, 0.15);
        color: #4ade80;
      }
      &.medium {
        background: rgba(14, 165, 233, 0.15);
        color: #38bdf8;
      }
      &.hard {
        background: rgba(236, 72, 153, 0.15);
        color: #f472b6;
      }
    }

    .btn-action {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: white;
      padding: 0.4rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      font-family: var(--font-kids-heading);
      font-size: 0.85rem;
      transition: all 0.2s;

      &:hover {
        background: var(--color-primary-violet);
        border-color: var(--color-primary-violet);
        box-shadow: 0 0 12px var(--color-primary-glow);
        transform: scale(1.05);
      }
    }

    @keyframes spin-planet {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.2); opacity: 0.75; }
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
      .navbar {
        flex-direction: column;
        gap: 1rem;
        padding: 1.25rem 1rem;
        align-items: center;
        text-align: center;
      }

      .user-menu {
        flex-direction: column;
        gap: 0.75rem;
        width: 100%;
        align-items: center;
      }

      .logo-group {
        justify-content: center;
      }

      .dashboard-content {
        padding: 1.5rem 1rem;
      }

      .content-header {
        margin-bottom: 2.25rem;

        h1 {
          font-size: 2.2rem;
        }
        p {
          font-size: 1rem;
        }
      }

      .metrics-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .metric-card {
        padding: 1.5rem;
      }

      .metric-value {
        font-size: 2.2rem;
      }

      .control-panel {
        padding: 1.5rem 1rem;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  readonly authService = inject(AuthService);
  private readonly _router = inject(Router);

  simulateEdit(moduleName: string): void {
    alert(`Consola: Ajustando configuraciones del planeta "${moduleName}". Simulación exitosa.`);
  }

  async onLogout(): Promise<void> {
    this.authService.logout();
    await this._router.navigate(['/login']);
  }
}
