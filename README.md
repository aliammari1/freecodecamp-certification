# FreeCodeCamp Backend API Portfolio

> A curated collection of **5 microservice APIs** built for the freeCodeCamp Backend Development and APIs certification, now unified in a single monorepo with comprehensive documentation, interactive API playground, and modern tooling.

[![Bun](https://img.shields.io/badge/Bun-1.0+-f9f1e1?style=flat-square&logo=bun)](https://bun.sh)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-5.0-404040?style=flat-square)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-47A248?style=flat-square&logo=mongodb)](https://mongodb.com)
[![License](https://img.shields.io/badge/License-Source--Available-orange?style=flat-square)](LICENSE.md)

## 📁 Monorepo Structure

```
freecodecamp-portfolio/
├── exercise-tracker/          # Exercise logging API with MongoDB
├── file-metadata/             # File upload & metadata extraction API
├── header-parser/             # HTTP request header parser API
├── timestamp/                 # Date/timestamp conversion API
├── url-shortener/             # URL shortening & redirect API
├── docs/                      # Mintlify documentation
├── swagger/                   # OpenAPI specifications
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0 (or Node.js >= 18)
- MongoDB (for Exercise Tracker and URL Shortener)

### Install Dependencies

```bash
# Install all dependencies across all projects
bun install
```

### Run Individual APIs

```bash
# Exercise Tracker
cd exercise-tracker && bun run dev

# File Metadata
cd file-metadata && bun run dev

# Header Parser
cd header-parser && bun run dev

# Timestamp
cd timestamp && bun run dev

# URL Shortener
cd url-shortener && bun run dev
```

## 📚 API Documentation

### Swagger/OpenAPI Playground

Each API includes interactive Swagger documentation. Visit `/api-docs` on any running API server:

- **Exercise Tracker**: `http://localhost:3000/api-docs`
- **File Metadata**: `http://localhost:3000/api-docs`
- **Header Parser**: `http://localhost:3000/api-docs`
- **Timestamp**: `http://localhost:3000/api-docs`
- **URL Shortener**: `http://localhost:3000/api-docs`

### 📖 Full Documentation

Comprehensive documentation is available via **Mintlify**:

👉 **[View Documentation](https://aliammari1.github.io/freecodecamp-portfolio)**

## 🛠️ Projects Overview

### 1. 🏃 Exercise Tracker API

Log exercises with descriptions, durations, and dates. Supports filtering by date range.

**Endpoints:**
- `POST /api/users` - Create a new user
- `GET /api/users` - List all users
- `POST /api/users/:_id/exercises` - Add exercise log
- `GET /api/users/:_id/logs` - Get exercise logs (with from/to/limit filters)

**Tech Stack:** Node.js, Express, MongoDB, Mongoose

---

### 2. 📄 File Metadata API

Upload files and retrieve metadata including filename, MIME type, and size.

**Endpoints:**
- `POST /api/fileanalyse` - Upload a file
- `GET /api/fileanalyse` - Get last uploaded file info

**Tech Stack:** Node.js, Express, Multer

---

### 3. 🔍 Header Parser API

Parse HTTP request headers and return client information including IP, language, and software.

**Endpoints:**
- `GET /api/whoami` - Get parsed header information

**Tech Stack:** Node.js, Express

---

### 4. ⏰ Timestamp API

Convert between date strings and Unix timestamps.

**Endpoints:**
- `GET /api/:date` - Convert a date string or Unix timestamp
- `GET /api` - Get current timestamp

**Tech Stack:** Node.js, Express

---

### 5. 🔗 URL Shortener API

Shorten long URLs and redirect using short IDs.

**Endpoints:**
- `POST /api/shorturl` - Create a short URL
- `GET /api/shorturl/:id` - Redirect to original URL

**Tech Stack:** Node.js, Express, MongoDB

## 🧪 Testing

```bash
# Run tests for all projects
bun test

# Run tests for a specific project
cd exercise-tracker && bun test
```

## 🎓 What I Learned

Through building these microservices, I gained hands-on experience with:

- **RESTful API design** with Express.js
- **MongoDB schema modeling** with Mongoose
- **File upload handling** with Multer
- **HTTP header parsing** and client detection
- **Date parsing and formatting** with JavaScript
- **URL validation** with DNS lookup
- **API documentation** with Swagger/OpenAPI
- **Monorepo management** with Git subtrees

> **Why this matters for FAANG interviews:** Understanding microservices architecture, API design, and data persistence are core skills tested in backend engineering interviews at top tech companies.

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for setup instructions, coding standards, and the pull request process.

## 📄 License

This project is licensed under a [Source-Available License](LICENSE.md).

## 👤 Author

**Ali Ammari**
- GitHub: [@aliammari1](https://github.com/aliammari1)
- Email: ammari.ali.0001@gmail.com

---

*Built with ❤️ for the freeCodeCamp Backend Development and APIs certification.*
