'use client';
import { RemoteCart } from '~/use-cases/contracts/RemoteCart';
import { useLocalCart } from './useLocalCart';
import { useEffect, useState } from 'react';

export function useRemoteCart(): RemoteCart {
  const { cart } = useLocalCart();
  const [state, setState] = useState({
    loading: true,
    hydratedCart: null
  })

  useEffect(() => {
    setState({
      ...state,
      loading: true
    });

    (async () => {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale: "en",
          items: Object.values(cart.items),
        })
      });
      const hydratedCart = await response.json();
      setState({
        ...state,
        hydratedCart: hydratedCart,
        loading: false,
      });
    })();
  }, [cart]);

  return {
    loading: state.loading,
    remoteCart: state.hydratedCart
  };
}