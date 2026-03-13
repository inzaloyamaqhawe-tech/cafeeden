import { useMemo, useState } from 'react'
import './App.css'

const MENU = [
  { id: 1, name: 'Loaded Kota', price: 65, tag: 'Street Favorite' },
  { id: 2, name: 'Grilled Chicken Wrap', price: 78, tag: 'Chef Pick' },
  { id: 3, name: 'Classic Beef Burger', price: 89, tag: 'Top Seller' },
  { id: 4, name: 'Crispy Fries Basket', price: 42, tag: 'Side' },
  { id: 5, name: 'Breakfast Combo', price: 95, tag: 'Morning' },
  { id: 6, name: 'Family Feast Platter', price: 235, tag: 'Sharing' },
]

const ORDER_WHATSAPP = '27676672270'
const AGENCY_WHATSAPP = '2760639793'

function App() {
  const [cart, setCart] = useState({})

  const items = useMemo(
    () => MENU.filter((m) => (cart[m.id] || 0) > 0).map((m) => ({ ...m, qty: cart[m.id] })),
    [cart],
  )

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.qty * item.price, 0),
    [items],
  )

  const orderMessage = useMemo(() => {
    if (!items.length) {
      return 'Hi Cafe Eden, I would like to place an order.'
    }

    const lines = items.map((item) => `- ${item.name} x${item.qty} = R${item.qty * item.price}`)
    return [
      'Hi Cafe Eden, I want to place this order:',
      ...lines,
      `Total: R${total}`,
      '',
      'Name:',
      'Pickup/Delivery:',
      'Address (if delivery):',
    ].join('\n')
  }, [items, total])

  const orderLink = `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(orderMessage)}`
  const agencyLink =
    `https://wa.me/${AGENCY_WHATSAPP}?text=` +
    encodeURIComponent('Hi Inzalo Yamaqhawe Technologies, I want to ask about your services.')

  function updateQty(id, delta) {
    setCart((prev) => {
      const next = Math.max(0, (prev[id] || 0) + delta)
      return { ...prev, [id]: next }
    })
  }

  return (
    <main className="page">
      <header className="hero">
        <div className="hero-copy">
          <p className="pill">Cafe Eden Proposal</p>
          <h1>Bright. Fast. Delicious. Ordered on WhatsApp.</h1>
          <p className="sub">
            Let customers view your place, choose meals, and submit orders instantly to your WhatsApp.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href={orderLink} target="_blank" rel="noreferrer">
              Order on WhatsApp
            </a>
            <a className="btn btn-soft" href="tel:+27676672270">
              Call +27 67 667 2270
            </a>
          </div>
        </div>
        <div className="hero-card" aria-label="business details">
          <h2>Cafe Eden</h2>
          <p>51 Khuto Cres, Mamelodi, Pretoria</p>
          <p>Open today until 9pm</p>
          <p>Rated 4.2 by local customers</p>
        </div>
      </header>

      <section className="menu-grid">
        {MENU.map((item) => (
          <article className="menu-card" key={item.id}>
            <p className="menu-tag">{item.tag}</p>
            <h3>{item.name}</h3>
            <p className="price">R{item.price}</p>
            <div className="qty-row">
              <button onClick={() => updateQty(item.id, -1)} aria-label={`Remove one ${item.name}`}>
                -
              </button>
              <span>{cart[item.id] || 0}</span>
              <button onClick={() => updateQty(item.id, 1)} aria-label={`Add one ${item.name}`}>
                +
              </button>
            </div>
          </article>
        ))}
      </section>

      <section className="checkout">
        <div>
          <h2>Your Order</h2>
          {!items.length ? (
            <p className="empty">Pick meals above to begin your order.</p>
          ) : (
            <ul className="line-items">
              {items.map((item) => (
                <li key={item.id}>
                  <span>{item.name} x{item.qty}</span>
                  <strong>R{item.qty * item.price}</strong>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="checkout-panel">
          <p className="total">Total: R{total}</p>
          <a className="btn btn-primary wide" href={orderLink} target="_blank" rel="noreferrer">
            Send Order to WhatsApp
          </a>
          <p className="hint">Business WhatsApp: +27 67 667 2270</p>
        </div>
      </section>

      <footer className="site-footer">
        <a href={agencyLink} target="_blank" rel="noreferrer">
          Powered by: Inzalo Yamaqhawe Technologies
        </a>
      </footer>
    </main>
  )
}

export default App
