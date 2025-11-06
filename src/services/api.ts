/**
 * Servicio de API para setup/teardown
 */
export interface ApiResponse<T> { success: boolean; data?: T; error?: string }

export class ApiService {
  constructor(private baseUrl = process.env.API_BASE_URL || '') {}

  async get<T>(path: string): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`);
      const data = (await res.json()) as T;
      return { success: true, data };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Error GET' };
    }
  }

  async post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as T;
      return { success: true, data };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Error POST' };
    }
  }

  async setup(): Promise<void> {
    // Implementar lógica de preparación de datos si aplica
  }

  async teardown(): Promise<void> {
    // Implementar limpieza de datos si aplica
  }
}