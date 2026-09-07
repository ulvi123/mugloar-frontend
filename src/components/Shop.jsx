import React, { useState } from 'react';

export default function Shop({ items, gold, onBuy, onClose, loading }) {
  const [message, setMessage] = useState(null);

  const handleBuy = async (itemId) => {
    setMessage(null);
    const result = await onBuy(itemId);
    if (result && result.shoppingSuccess === false) {
      setMessage('Purchase failed — check your gold.');
    }
  };

  return (
      <div className="shop-modal" role="dialog" aria-label="Shop">
        <div className="shop-modal__content">
          <div className="shop-modal__header">
            <h2>Shop</h2>
            <button onClick={onClose} aria-label="Close shop">×</button>
          </div>
          {message && <p className="shop-modal__message">{message}</p>}
          <ul className="shop-list">
            {items.map((item) => (
                <li key={item.id} className="shop-item">
                  <div>
                    <strong>{item.name}</strong>
                    <span className="shop-item__cost">{item.cost} gold</span>
                  </div>
                  <button
                      onClick={() => handleBuy(item.id)}
                      disabled={loading || gold < item.cost}
                  >
                    Buy
                  </button>
                </li>
            ))}
          </ul>
        </div>
      </div>
  );
}