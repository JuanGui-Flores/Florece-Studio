// src/lib/rateLimit.ts
type RateLimitOptions = {
  interval: number;
  uniqueTokenPerInterval: number;
};

export default function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new Map<string, number[]>();
  const interval = options?.interval || 60 * 1000; // Por defecto 1 minuto
  const uniqueTokenPerInterval = options?.uniqueTokenPerInterval || 500;

  return {
    check: (_res: unknown, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0];
        const now = Date.now();
        const windowStart = now - interval;

        // Limpiar registros antiguos
        const requestsInWindow = tokenCount.filter((timestamp) => timestamp > windowStart);

        if (requestsInWindow.length >= limit) {
          reject(new Error("Rate limit exceeded"));
          return;
        }

        requestsInWindow.push(now);
        tokenCache.set(token, requestsInWindow);

        // Controlar tamaño de memoria del mapa
        if (tokenCache.size > uniqueTokenPerInterval) {
          const oldestKey = tokenCache.keys().next().value;
          if (oldestKey) tokenCache.delete(oldestKey);
        }

        resolve();
      }),
  };
}