import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

export function useSearchSync(debounceDelay = 300) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') ?? '';
  const [inputValue, setInputValue] = useState(initialSearch);
  const debouncedValue = useDebouncedValue(inputValue, debounceDelay);

  useEffect(() => {
    if (debouncedValue) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('search', debouncedValue);
        return params;
      });
    } else {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete('search');
        return params;
      });
    }
  }, [debouncedValue, setSearchParams]);

  return {
    inputValue,
    setInputValue,
    debouncedValue,
  };
}
