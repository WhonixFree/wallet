import { useEffect, useState, type DependencyList } from "react";

interface AsyncState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useAsyncData = <T,>(
  loader: () => Promise<T>,
  deps: DependencyList
): AsyncState<T> & { reload: () => void } => {
  const [tick, setTick] = useState(0);
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    let active = true;
    setState((current) => ({ ...current, loading: true, error: null }));

    loader()
      .then((data) => {
        if (!active) {
          return;
        }
        setState({ data, error: null, loading: false });
      })
      .catch((error: unknown) => {
        if (!active) {
          return;
        }
        setState({
          data: null,
          error: error instanceof Error ? error.message : "Unknown error",
          loading: false
        });
      });

    return () => {
      active = false;
    };
  }, [...deps, tick]);

  return {
    ...state,
    reload: () => setTick((value) => value + 1)
  };
};
