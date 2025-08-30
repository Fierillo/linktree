'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Linktree() {
  const [profileImage, setProfileImage] = useState<string>('/profile.jpg')
  const [isEditing, setIsEditing] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [name, setName] = useState('Captain Your Name')
  const [bio, setBio] = useState('Arrr, matey! Follow me treasures and adventures.')
  const [links, setLinks] = useState([
    { name: 'WhatsApp', url: 'https://chat.whatsapp.com/BSZy2cScQJJIcvwqPAInwB', icon: '/icons/instagram.svg' },
    { name: 'Twitter', url: 'https://twitter.com/bitcoinnea', icon: '/icons/x.svg' },
    { name: 'YouTube', url: 'https://youtube.com/yourchannel', icon: '/icons/youtube.svg' },
    { name: 'Website', url: 'https://yourwebsite.com', icon: '/icons/globe.svg' },
    { name: 'Email', url: 'mailto:your@email.com', icon: '/icons/gmail.svg' },
  ])
  const [contacts, setContacts] = useState([
    { name: 'Capitán Jack', role: 'Líder de la Comunidad', email: 'jack@pirates.com' },
    { name: 'Barbanegra', role: 'Moderador', email: 'barba@pirates.com' },
    { name: 'Calico Jack', role: 'Soporte', email: 'calico@pirates.com' },
  ])

  useEffect(() => {
    const savedImage = localStorage.getItem('profileImage')
    if (savedImage) setProfileImage(savedImage)

    const savedName = localStorage.getItem('name')
    if (savedName) setName(savedName)

    const savedBio = localStorage.getItem('bio')
    if (savedBio) setBio(savedBio)

    const savedLinks = localStorage.getItem('links')
    if (savedLinks) setLinks(JSON.parse(savedLinks))

    const savedContacts = localStorage.getItem('contacts')
    if (savedContacts) setContacts(JSON.parse(savedContacts))
  }, [])

  const saveToStorage = () => {
    localStorage.setItem('profileImage', profileImage)
    localStorage.setItem('name', name)
    localStorage.setItem('bio', bio)
    localStorage.setItem('links', JSON.stringify(links))
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setProfileImage(result)
      localStorage.setItem('profileImage', result)
    }
    reader.readAsDataURL(file)
  }

  const handleEditToggle = () => {
    if (isEditing) {
      const filtered = links.filter(link => link.name.trim() !== '')
      setLinks(filtered)
      saveToStorage()
    }
    const password = isEditing ? null : prompt('Ingresa la contraseña para editar:')
    if (!isEditing && password === 'pirate123') {
      setIsEditing(true)
    } else if (isEditing) {
      setIsEditing(false)
    } else {
      alert('Contraseña incorrecta!')
    }
    setEditingField(null)
  }

  const handleFieldEdit = (field: string) => {
    setEditingField(field)
  }

  const handleSaveField = () => {
    setEditingField(null)
    saveToStorage()
  }

  const handleReset = () => {
    localStorage.clear()
    window.location.reload()
  }

  const filteredLinks = links.filter(link => link.name.trim() !== '')

  return (
    <div className="container">
      <button onClick={handleEditToggle} className="edit-toggle">
        {isEditing ? 'Salir de Edición' : 'Editar'}
      </button>
      {isEditing && (
        <button onClick={handleReset} className="reset-button">Reset</button>
      )}
      <div className="profile">
        <div className="image-container">
          <Image
            src={profileImage}
            alt="Pirate Profile"
            width={120}
            height={120}
            className="profile-img"
          />
          {isEditing && (
            <button onClick={() => setEditingField('image')} className="edit-icon">✏️</button>
          )}
          {editingField === 'image' && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="inline-input"
            />
          )}
        </div>
        {editingField === 'name' ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleSaveField}
            className="inline-input"
          />
        ) : (
          <h1 onClick={() => isEditing && handleFieldEdit('name')}>
            {name}
            {isEditing && <span className="edit-icon"> ✏️</span>}
          </h1>
        )}
        {editingField === 'bio' ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            onBlur={handleSaveField}
            className="inline-input"
          />
        ) : (
          <p onClick={() => isEditing && handleFieldEdit('bio')}>
            {bio}
            {isEditing && <span className="edit-icon"> ✏️</span>}
          </p>
        )}
      </div>
      <ul className="links">
        {(isEditing ? links : filteredLinks).map((link, index) => (
          <li key={index}>
            {isEditing ? (
              <span className="link">
                <img src={link.icon} alt={link.name} className="link-icon" />
                {editingField === `link-${index}` ? (
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre"
                      value={link.name}
                      onChange={(e) => {
                        const newLinks = [...links]
                        newLinks[index].name = e.target.value
                        setLinks(newLinks)
                      }}
                      className="inline-input"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...links]
                        newLinks[index].url = e.target.value
                        setLinks(newLinks)
                      }}
                      className="inline-input"
                    />
                  </div>
                ) : (
                  <span onClick={() => setEditingField(`link-${index}`)}>
                    {link.name || 'Vacío'}
                    <span className="edit-icon"> ✏️</span>
                  </span>
                )}
              </span>
            ) : (
              <a href={link.url} className="link">
                <img src={link.icon} alt={link.name} className="link-icon" />
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>
      <footer className="footer">
        <h2>Contactos de la Comunidad</h2>
        <ul className="contacts">
          {contacts.map((contact, index) => (
            <li key={index}>
              {editingField === `contact-${index}` ? (
                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={contact.name}
                    onChange={(e) => {
                      const newContacts = [...contacts]
                      newContacts[index].name = e.target.value
                      setContacts(newContacts)
                    }}
                    className="inline-input"
                  />
                  <input
                    type="text"
                    placeholder="Rol"
                    value={contact.role}
                    onChange={(e) => {
                      const newContacts = [...contacts]
                      newContacts[index].role = e.target.value
                      setContacts(newContacts)
                    }}
                    className="inline-input"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={contact.email}
                    onChange={(e) => {
                      const newContacts = [...contacts]
                      newContacts[index].email = e.target.value
                      setContacts(newContacts)
                    }}
                    className="inline-input"
                  />
                </div>
              ) : (
                <span onClick={() => isEditing && setEditingField(`contact-${index}`)}>
                  <strong>{contact.name}</strong> - {contact.role}: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  {isEditing && <span className="edit-icon"> ✏️</span>}
                </span>
              )}
            </li>
          ))}
        </ul>
      </footer>
    </div>
  )
}