import React from 'react';

export function usePersistedState(key: string, defaultValue: any) {
  const [state, setState] = React.useState(
    () => JSON.parse(sessionStorage.getItem(key)) || defaultValue
  );
  React.useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}
