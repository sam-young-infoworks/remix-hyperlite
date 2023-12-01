'use client';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { LocalCart } from '~/use-cases/contracts/LocalCart';

const InitializeEmptyLocalCart = (): LocalCart => {
  return {
    items: {},
    cartId: '',
    state: 'cart',
    // extra: {},
  };
};

export function useLocalCart() {
  const [cart] = useLocalStorage<LocalCart>('cart', InitializeEmptyLocalCart());
  const update = (cart: LocalCart) => {
    writeStorage('cart', {
      ...cart,
    });
  };

  return {
    cart,
    isEmpty: () => {
      return Object.keys(cart.items).length === 0;
    },
    add: (
      item: {
        name: string;
        sku: string;
        price: number;
      },
      quantity: number = 1,
    ) => {
      // if (isImmutable()) {
      //   return;
      // }
      if (cart.items[item.sku]) {
        // update cart quantity if item already exists in local storage
        cart.items[item.sku].quantity = cart.items[item.sku].quantity + quantity;
      } else {
        cart.items[item.sku] = {
          sku: item.sku,
          name: item.name,
          price: item.price,
          quantity: quantity,
        };
      }
      update(cart);
    },
  }
}