import { Injectable, signal, computed } from '@angular/core';
import { User, USERS_MOCK } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // State represented as private signals
  private readonly _currentUser = signal<User | null>(null);

  // Public read-only signals for the application
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this._currentUser() !== null);
  readonly userRole = computed(() => this._currentUser()?.role ?? null);

  /**
   * Simulates a login request.
   * Returns a promise that resolves to true if successful, false otherwise.
   */
  async login(username: string, password: string): Promise<boolean> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const foundUser = USERS_MOCK.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (foundUser) {
      this._currentUser.set({
        id: foundUser.id,
        username: foundUser.username,
        role: foundUser.role,
        name: foundUser.name
      });
      return true;
    }

    return false;
  }

  /**
   * Clears the session.
   */
  logout(): void {
    this._currentUser.set(null);
  }
}
