export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'STUDENT';
  name: string;
}

export const USERS_MOCK = [
  {
    id: '1',
    username: 'admin',
    password: 'password123',
    role: 'ADMIN' as const,
    name: 'Admin Principal'
  },
  {
    id: '2',
    username: 'estudiante',
    password: 'password123',
    role: 'STUDENT' as const,
    name: 'Estudiante Ejemplo'
  }
];
