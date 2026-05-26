import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Top Cosmic Bar -->
      <nav class="navbar">
        <div class="logo-group">
          <span class="logo-emoji">🚀</span>
          <span class="logo-text">MrsApp Rockstar</span>
        </div>
        <div class="user-menu">
          <div class="xp-badge">
            <span class="star-icon">⭐</span>
            <span class="xp-text">{{ xp() }} XP</span>
          </div>
          <span class="user-name">¡Hola, {{ authService.currentUser()?.name }}!</span>
          <button (click)="onLogout()" class="btn-logout">Salir</button>
        </div>
      </nav>

      <!-- Main Space Map -->
      <main class="dashboard-content">
        <header class="content-header">
          <h1>¡Tu Gira de Conciertos! 🎸🌟</h1>
          <p>¡Elige a tu Tutor Musical y empieza a ganar Púas de Oro!</p>
        </header>

        <!-- Tutors Grid (Instrument Buddies) -->
        <section class="tutors-section">
          <h2>🎸 Tus Profesores Instrumentos</h2>
          <div class="grid-cards">
            <!-- Roxi la Guitarra -->
            <div class="card card-guitar" [class.active-card]="activeTutor() === 'roxi'" (click)="selectTutor('roxi')">
              <div class="card-glow"></div>
              <span class="card-icon">⚡🎸</span>
              <h3>Roxi la Guitarra</h3>
              <p>¡Aprende las cuerdas mágicas y toca acordes de Rock increíble!</p>
              <span class="difficulty-tag easy">FÁCIL</span>
            </div>

            <!-- Leo el Teclado -->
            <div class="card card-piano" [class.active-card]="activeTutor() === 'leo'" (click)="selectTutor('leo')">
              <div class="card-glow"></div>
              <span class="card-icon">🎹✨</span>
              <h3>Leo el Teclado</h3>
              <p>Descubre las teclas musicales y aprende teoría de forma espacial.</p>
              <span class="difficulty-tag medium">MEDIO</span>
            </div>

            <!-- Bongo el Tambor -->
            <div class="card card-drums" [class.active-card]="activeTutor() === 'bongo'" (click)="selectTutor('bongo')">
              <div class="card-glow"></div>
              <span class="card-icon">🥁💥</span>
              <h3>Bongo el Tambor</h3>
              <p>¡Domina el tempo y sigue el ritmo más rockero del cosmos!</p>
              <span class="difficulty-tag hard">DIFÍCIL</span>
            </div>
          </div>
        </section>

        <!-- Quest Section -->
        <section class="quest-section">
          <div class="quest-box">
            @if (activeTutor()) {
              <div class="quest-active">
                <h3>🚀 Misión Activa con {{ getTutorName() }}</h3>
                <p>Completa el minijuego de hoy para desbloquear el siguiente planeta musical y ganar +50 XP.</p>
                <div class="progress-container">
                  <div class="progress-bar" [style.width]="progress() + '%'"></div>
                </div>
                <div class="button-group">
                  <button (click)="playGame()" class="btn-play btn-squishy">¡Empezar a Tocar! 🎶</button>
                  <button (click)="resetProgress()" class="btn-reset">Reiniciar Misión</button>
                </div>
              </div>
            } @else {
              <div class="quest-placeholder">
                <p>👉 ¡Haz clic en un <strong>Profesor Instrumento</strong> arriba para activar tu primera misión musical!</p>
              </div>
            }
          </div>
        </section>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      min-height: 100vh;
      color: #ffffff;
      padding-bottom: 3rem;
    }
    
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(12, 7, 29, 0.6);
      backdrop-filter: blur(12px);
      border-bottom: 2px solid var(--glass-border);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .logo-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .logo-emoji {
        font-size: 1.8rem;
        animation: float 3s ease-in-out infinite;
      }
      .logo-text {
        font-family: var(--font-kids-heading);
        font-size: 1.4rem;
        font-weight: 700;
        background: linear-gradient(135deg, var(--color-secondary-cyan) 0%, var(--color-accent-pink) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 1.25rem;
    }

    .xp-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(245, 158, 11, 0.15);
      border: 1.5px solid var(--color-warning-amber);
      border-radius: 12px;
      padding: 0.4rem 0.8rem;
      font-family: var(--font-kids-heading);
      font-weight: 700;
      color: var(--color-warning-amber);

      .star-icon {
        font-size: 1.1rem;
        animation: spin-star 4s linear infinite;
      }
    }

    .user-name {
      font-family: var(--font-kids-heading);
      font-weight: 600;
      color: #e2e8f0;
    }

    .btn-logout {
      background: rgba(239, 68, 68, 0.1);
      border: 1.5px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      padding: 0.4rem 1rem;
      border-radius: 10px;
      cursor: pointer;
      font-family: var(--font-kids-heading);
      font-weight: 600;
      transition: all 0.2s;

      &:hover {
        background: #ef4444;
        color: white;
        transform: scale(1.05);
      }
    }

    .dashboard-content {
      padding: 2.5rem 1.5rem;
      max-width: 1100px;
      margin: 0 auto;
    }

    .content-header {
      text-align: center;
      margin-bottom: 3.5rem;

      h1 {
        font-family: var(--font-kids-heading);
        font-size: 3rem;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #ffffff 30%, #cbd5e1 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      p {
        color: #94a3b8;
        font-size: 1.25rem;
      }
    }

    .tutors-section {
      margin-bottom: 3.5rem;

      h2 {
        font-family: var(--font-kids-heading);
        font-size: 1.8rem;
        margin-bottom: 1.5rem;
        color: #e2e8f0;
      }
    }

    .grid-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .card {
      background: var(--glass-bg);
      border: 2px solid var(--glass-border);
      border-radius: 24px;
      padding: 2rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 16px 32px rgba(0,0,0,0.3);
      }

      .card-glow {
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        filter: blur(50px);
        top: -20px;
        right: -20px;
        opacity: 0.3;
        transition: opacity 0.3s;
      }

      &.card-guitar {
        .card-glow { background: var(--color-accent-pink); }
        &:hover, &.active-card {
          border-color: var(--color-accent-pink);
          box-shadow: 0 0 20px var(--color-accent-glow);
        }
      }
      &.card-piano {
        .card-glow { background: var(--color-secondary-cyan); }
        &:hover, &.active-card {
          border-color: var(--color-secondary-cyan);
          box-shadow: 0 0 20px var(--color-secondary-glow);
        }
      }
      &.card-drums {
        .card-glow { background: var(--color-primary-violet); }
        &:hover, &.active-card {
          border-color: var(--color-primary-violet);
          box-shadow: 0 0 20px var(--color-primary-glow);
        }
      }

      &.active-card {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-4px) scale(1.02);
      }

      .card-icon {
        font-size: 3rem;
        margin-bottom: 1.25rem;
        display: block;
      }

      h3 {
        font-family: var(--font-kids-heading);
        font-size: 1.4rem;
        margin-bottom: 0.75rem;
        color: white;
      }

      p {
        color: #94a3b8;
        font-size: 0.95rem;
        line-height: 1.5;
        margin-bottom: 1.5rem;
        flex-grow: 1;
      }
    }

    .difficulty-tag {
      align-self: flex-start;
      font-family: var(--font-kids-heading);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.3rem 0.75rem;
      border-radius: 8px;
      letter-spacing: 0.05em;

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

    .quest-section {
      width: 100%;
    }

    .quest-box {
      background: var(--glass-bg);
      border: 2px solid var(--glass-border);
      border-radius: 24px;
      padding: 2.5rem;
      min-height: 180px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      box-shadow: var(--glass-shadow);
      position: relative;
    }

    .quest-placeholder {
      p {
        font-family: var(--font-kids-heading);
        font-size: 1.2rem;
        color: #94a3b8;
        margin: 0;
      }
    }

    .quest-active {
      width: 100%;
      max-width: 600px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;

      h3 {
        font-family: var(--font-kids-heading);
        font-size: 1.6rem;
        color: white;
      }
      p {
        color: #cbd5e1;
        font-size: 1.05rem;
        margin: 0;
      }
    }

    .progress-container {
      width: 100%;
      height: 18px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin: 0.5rem 0;
    }

    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, var(--color-secondary-cyan) 0%, var(--color-accent-pink) 100%);
      box-shadow: 0 0 10px var(--color-accent-glow);
      border-radius: 10px;
      transition: width 0.4s ease;
    }

    .button-group {
      display: flex;
      align-items: center;
      gap: 1.5rem;
      margin-top: 0.5rem;
    }

    .btn-play {
      background: linear-gradient(135deg, var(--color-success-lime) 0%, var(--color-secondary-cyan) 100%);
      color: white;
      padding: 0.85rem 2rem;
      font-size: 1.15rem;
      box-shadow: 0 6px 15px var(--color-success-glow);

      &:hover {
        box-shadow: 0 8px 20px rgba(34, 197, 94, 0.6);
      }
    }

    .btn-reset {
      background: transparent;
      border: none;
      color: #94a3b8;
      cursor: pointer;
      font-family: var(--font-kids-heading);
      font-size: 0.9rem;
      transition: color 0.2s;

      &:hover {
        color: #ef4444;
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }

    @keyframes spin-star {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
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

      .grid-cards {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .card {
        padding: 1.5rem;
        
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }

        h3 {
          font-size: 1.25rem;
        }
      }

      .quest-box {
        padding: 1.5rem;
      }

      .quest-active {
        h3 {
          font-size: 1.3rem;
        }
        p {
          font-size: 0.95rem;
        }
      }

      .button-group {
        flex-direction: column;
        gap: 1rem;
        width: 100%;

        .btn-play {
          width: 100%;
          padding: 0.75rem 1.5rem;
          font-size: 1.05rem;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentComponent {
  readonly authService = inject(AuthService);
  private readonly _router = inject(Router);

  // States
  readonly activeTutor = signal<'roxi' | 'leo' | 'bongo' | null>(null);
  readonly xp = signal(120);
  readonly progress = signal(25);

  selectTutor(tutor: 'roxi' | 'leo' | 'bongo'): void {
    this.activeTutor.set(tutor);
    // Reset standard progress for tutor
    this.progress.set(tutor === 'roxi' ? 40 : tutor === 'leo' ? 20 : 10);
  }

  getTutorName(): string {
    const tutor = this.activeTutor();
    if (tutor === 'roxi') return 'Roxi la Guitarra';
    if (tutor === 'leo') return 'Leo el Teclado';
    if (tutor === 'bongo') return 'Bongo el Tambor';
    return '';
  }

  playGame(): void {
    const nextProg = this.progress() + 20;
    if (nextProg >= 100) {
      this.progress.set(100);
      this.xp.update(x => x + 50);
      alert('¡FELICIDADES ROCKSTAR! 🎸✨ Completaste la misión de hoy y ganaste +50 XP.');
      this.progress.set(0);
      this.activeTutor.set(null);
    } else {
      this.progress.set(nextProg);
      this.xp.update(x => x + 10);
    }
  }

  resetProgress(): void {
    this.progress.set(0);
  }

  async onLogout(): Promise<void> {
    this.authService.logout();
    await this._router.navigate(['/login']);
  }
}
