'use client'

import Image from 'next/image'
import { linktreeData } from '../data/LinktreeData'

export default function Linktree() {
  const { profile, links, contacts, footer } = linktreeData

  return (
    <div className="container">
      <div className="profile">
        <Image
          src={profile.image}
          alt="Pirate Profile"
          width={120}
          height={120}
          className="profile-img"
        />
        <h1>{profile.name}</h1>
        <p>{profile.bio}</p>
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
        <p>{footer.copyright}</p>
      </footer>
    </div>
  )
}