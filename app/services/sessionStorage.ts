export function setSessionData(key: string, data: unknown) {
  sessionStorage.setItem(key, JSON.stringify(data));
}

export function getSessionData(key: string): Record<string, unknown> {
  return JSON.parse(sessionStorage.getItem(key) || '{}')
}