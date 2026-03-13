import { useMemo, useState } from 'react'
import './App.css'

const MENU = [
  {
    id: 1,
    name: 'Loaded Kota',
    price: 65,
    tag: 'Street Favorite',
    image: 'https://img02.restaurantguru.com/c0a9-Restaurant-22-Chillas-Joint-food.jpg',
  },
  {
    id: 2,
    name: 'Chicken Wrap Deluxe',
    price: 78,
    tag: 'Chef Pick',
    image: 'https://img02.restaurantguru.com/cc7c-Restaurant-Cafe-eden-spring-rolls.jpg',
  },
  {
    id: 3,
    name: 'Classic Beef Burger',
    price: 89,
    tag: 'Top Seller',
    image: 'https://img02.restaurantguru.com/cb29-Cafe-eden-Pretoria-photo.jpg',
  },
  {
    id: 4,
    name: 'Crispy Fries Basket',
    price: 42,
    tag: 'Side',
    image: 'https://img02.restaurantguru.com/c2b4-Restaurant-Cafe-eden-facade.jpg',
  },
  {
    id: 5,
    name: 'Breakfast Combo',
    price: 95,
    tag: 'Morning',
    image: 'https://img02.restaurantguru.com/c685-Restaurant-22-Chillas-Joint-exterior.jpg',
  },
  {
    id: 6,
    name: 'Family Feast Platter',
    price: 235,
    tag: 'Sharing',
    image: 'https://img02.restaurantguru.com/c86b-Restaurant-22-Chillas-Joint-photo-1.jpg',
  },
]

const GALLERY = [
  {
    id: 'g1',
    title: 'Signature Meals',
    image: 'https://img02.restaurantguru.com/c0a9-Restaurant-22-Chillas-Joint-food.jpg',
  },
  {
    id: 'g2',
    title: 'Wraps and Light Meals',
    image: 'https://img02.restaurantguru.com/cc7c-Restaurant-Cafe-eden-spring-rolls.jpg',
  },
  {
    id: 'g3',
    title: 'Cafe Eden Interior',
    image: 'https://img02.restaurantguru.com/cb29-Cafe-eden-Pretoria-photo.jpg',
  },
  {
    id: 'g4',
    title: 'Outdoor and Entrance',
    image: 'https://img02.restaurantguru.com/c2b4-Restaurant-Cafe-eden-facade.jpg',
  },
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
  const quickAskLink = `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent('Hi Cafe Eden, I would like to ask about today\'s specials and table availability.')}`
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
      <nav className="topnav">
        <div className="brand">Cafe Eden</div>
        <div className="navlinks">
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#atmosphere">Atmosphere</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-copy">
          <p className="pill">Welcome to Cafe Eden</p>
          <h1>Flavor That Brings People Together.</h1>
          <p className="sub">
            Fresh meals, warm service, and a place where every visit feels like home.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary" href={orderLink} target="_blank" rel="noreferrer">
              Request an Order
            </a>
            <a className="btn btn-soft" href={quickAskLink} target="_blank" rel="noreferrer">
              Ask About Specials
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

      <section id="about" className="about">
        <h2>About Cafe Eden</h2>
        <p>
          Cafe Eden is a local Mamelodi favorite known for hearty plates, friendly service, and a
          welcoming atmosphere for families and friends.
        </p>
      </section>

      <section id="menu" className="menu-grid">
        <article className="menu-intro">
          <h2>Menu Highlights</h2>
          <p>
            Explore customer favorites from Cafe Eden.
            Sample prices are shown in ZAR and can be updated anytime.
          </p>
        </article>

        {MENU.map((item) => (
          <article className="menu-card" key={item.id}>
            <img className="menu-photo" src={item.image} alt={item.name} loading="lazy" />
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

      <section id="atmosphere" className="gallery">
        <h2>Atmosphere and Place</h2>
        <p>Show customers your food, vibe, and space before they arrive.</p>
        <div className="gallery-grid">
          {GALLERY.map((photo) => (
            <article className="gallery-card" key={photo.id}>
              <img src={photo.image} alt={photo.title} loading="lazy" />
              <p>{photo.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="checkout" id="contact">
        <div>
          <h2>Contact and Order</h2>
          {!items.length ? (
            <p className="empty">Select items above, then send your request through WhatsApp.</p>
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
            Send Order Request
          </a>
          <a className="btn btn-soft wide" href="tel:+27676672270">
            Call +27 67 667 2270
          </a>
          <p className="hint">WhatsApp & Phone: +27 67 667 2270</p>
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
