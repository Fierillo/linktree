'use client'

import Image from 'next/image'

export default function Linktree() {
  const links = [
    { name: 'WhatsApp', url: 'https://chat.whatsapp.com/BSZy2cScQJJIcvwqPAInwB', icon: '/icons/whatsapp.svg' },
    { name: 'X/Twitter', url: 'https://x.com/BitcoinNea', icon: '/icons/x.svg' },
  ]

  const contacts = [
    { name: 'Capitán Jack', role: 'Líder de la Comunidad', email: 'jack@pirates.com' },
    { name: 'Barbanegra', role: 'Moderador', email: 'barba@pirates.com' },
    { name: 'Calico Jack', role: 'Soporte', email: 'calico@pirates.com' },
  ]

  return (
    <div className="container">
      <div className="profile">
        <Image
          src="/profile.png"
          alt="Pirate Profile"
          width={120}
          height={120}
          className="profile-img"
        />
        <h1>Bitcoin NEA</h1>
        <p>La comunidad bitcoiner mas picante del noreste Argentino</p>
      </div>
      <ul className="links">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.url} className="link">
              <img src={link.icon} alt={link.name} className="link-icon" />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <footer className="footer">
        <h2>Contactos de la Comunidad</h2>
        <ul className="contacts">
          {contacts.map((contact, index) => (
            <li key={index}>
              <strong>{contact.name}</strong> - {contact.role}: <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          ))}
        </ul>
        <p>© 2023 Pirate Community. Arrr, all rights reserved!</p>
      </footer>
    </div>
  )
}