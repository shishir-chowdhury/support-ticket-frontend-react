# Support Ticket System - React Frontend

This is the **React frontend** for the **Support Ticket System**. It interacts with a Laravel backend API to manage tickets, comments, and live chat using **Pusher & Laravel Echo**.

---

## Table of Contents

- [Features](#features)
- [System Requirements](#system-requirements)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- User login & registration
- Ticket creation and listing
- View ticket details
- Add comments / live chat
- File attachments on tickets
- Role-based access for Customers & Admins
- Real-time chat using Pusher & Laravel Echo

---

## System Requirements

- Node.js >= 18.x
- npm or yarn
- React 18+
- Access to the Laravel backend API

---

## Installation

1. Clone the repository:
```bash
git clone <your-frontend-repo-url>
cd <your-frontend-folder>
Install dependencies:

~bash
npm install
or

~bash
yarn
Configure environment variables by creating a .env file in the project root:

.env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_PUSHER_KEY=your-pusher-app-key
VITE_PUSHER_CLUSTER=mt1
VITE_API_BASE_URL → URL of your Laravel backend API.

VITE_PUSHER_KEY → Pusher App Key.

VITE_PUSHER_CLUSTER → Pusher Cluster (e.g., mt1).

Start the development server:
~bash
npm run dev
The app will be available at https://supprt-ticket.shishirchowdhury.com

