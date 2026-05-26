# Especificación de Inicio de Sesión (Login)

## 1. Descripción General
Esta especificación define el flujo de autenticación para la aplicación. El objetivo principal es permitir el acceso a la plataforma validando las credenciales del usuario y determinando su rol correspondiente.

## 2. Roles de Usuario
El sistema soporta actualmente dos tipos de roles de usuario:
- **Administrador (`ADMIN`)**: Tiene acceso total al sistema, gestión de usuarios, configuración y visualización de todos los datos.
- **Estudiante (`STUDENT`)**: Tiene acceso limitado, enfocado en su propio perfil, calificaciones, cursos inscritos y material de estudio.

## 3. Flujo de Autenticación
1. El usuario ingresa a la ruta `/login`.
2. El usuario introduce sus credenciales (Nombre de Usuario y Contraseña) en el formulario de inicio de sesión.
3. El sistema envía las credenciales al servicio de autenticación.
4. El servicio valida las credenciales contra la base de datos (actualmente simulada con *mocks*).
5. Si las credenciales son válidas:
   - Se genera una sesión/token.
   - El sistema identifica el rol del usuario (Administrador o Estudiante).
   - El usuario es redirigido a su panel de control correspondiente (ej. `/admin/dashboard` o `/student/home`).
6. Si las credenciales son inválidas:
   - Se muestra un mensaje de error claro ("Credenciales incorrectas" o "Usuario no encontrado").

## 4. Implementación con Mocks (Fase Actual)
Por el momento, no existe un backend real para la validación. La validación se realizará utilizando *mocks* (datos simulados) directamente en el Frontend (Angular).

### 4.1. Datos Simulados (Mocks)
Se deberá crear un servicio en Angular (ej. `AuthMockService`) que contenga un arreglo de usuarios con la siguiente estructura:

```typescript
export interface UserMock {
  id: string;
  username: string;
  password: string; // En un escenario real, esto nunca se maneja en texto plano
  role: 'ADMIN' | 'STUDENT';
  name: string;
}

export const USERS_MOCK: UserMock[] = [
  {
    id: '1',
    username: 'admin',
    password: 'password123',
    role: 'ADMIN',
    name: 'Admin Principal'
  },
  {
    id: '2',
    username: 'estudiante',
    password: 'password123',
    role: 'STUDENT',
    name: 'Estudiante Ejemplo'
  }
];
```

### 4.2. Criterios de Aceptación
- El formulario debe validar que ambos campos (nombre de usuario y contraseña) no estén vacíos antes de permitir el envío.
- Al enviar el formulario, se debe simular un pequeño retraso de red (ej. 500ms usando `delay` de RxJS o `setTimeout` si se usan *signals*/*promises*) para que parezca una petición real.
- Dependiendo del nombre de usuario ingresado que coincida con el mock, se debe autorizar el acceso y enrutar al usuario según su rol.
