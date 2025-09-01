# Pirate Linktree

A minimalist Linktree. Arrr! 🏴‍☠️

## Description

This project is a simple website for sharing links and contacts, inspired by a pirate theme. Data is separated into an easy-to-edit file for quick updates.

## Requirements

- Node.js 18+
- npm or yarn

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/pirate-linktree.git
   cd pirate-linktree
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure Firebase for global persistence:
   - Create a project in [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore.
   - Copy the keys to `lib/firebase.ts`.

## Usage

1. Modify the data in `data/linktreeData.ts` to customize links, profile, and contacts.

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Structure

- `components/Linktree.tsx`: Main component.
- `data/linktreeData.ts`: Editable data (profile, links, contacts).
- `styles/globals.css`: Pirate styles.
- `public/`: Images and icons.

## Contribution

Arrr, send a PR if you want to improve the booty!

## License

MIT - Use and modify at your whim.

¡Arrr, translated and ready! 🏴‍☠️ If you need any adjustments, let me know.
