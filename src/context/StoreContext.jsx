import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('sushiCart');
      return localData ? JSON.parse(localData) : [];
    } catch (e) {
      return [];
    }
  });

  const [favourites, setFavourites] = useState(() => {
    try {
      const localData = localStorage.getItem('sushiFavs');
      return localData ? JSON.parse(localData) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sushiCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('sushiFavs', JSON.stringify(favourites));
  }, [favourites]);

  const handleAddToCart = (dish) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === dish.id);
      if (existing) {
        return prev.map(i => i.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id) => setCartItems(prev => prev.filter(i => i.id !== id));
  
  const clearCart = () => setCartItems([]);

  const handleToggleFav = (id) =>
    setFavourites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  const value = {
    cartItems,
    favourites,
    handleAddToCart,
    handleRemoveItem,
    clearCart,
    handleToggleFav
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
