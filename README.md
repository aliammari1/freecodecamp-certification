# 🔍 Request Header Parser Microservice

![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg)
![Express](https://img.shields.io/badge/Express-4.21+-blue.svg)
![freeCodeCamp](https://img.shields.io/badge/freeCodeCamp-Project-orange.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

**A Node.js microservice that parses HTTP request headers and returns client information including IP address, language preferences, and software details.**

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Technologies](#-technologies)
- [🚀 Installation](#-installation)
- [📖 Usage](#-usage)
- [🔌 API Endpoints](#-api-endpoints)
- [📱 Example Responses](#-example-responses)
- [🌐 Live Demo](#-live-demo)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

## 🎯 Overview

This project is part of the **freeCodeCamp Back End Development and APIs** certification. It demonstrates the fundamental concepts of:

- HTTP request header parsing
- RESTful API development
- Express.js server configuration
- Cross-Origin Resource Sharing (CORS)
- Environment variable management

The microservice analyzes incoming HTTP requests and extracts meaningful information from the headers, providing a simple JSON response with the client's details.

## ✨ Features

- **🌍 IP Address Detection**: Extracts client IP address from request headers
- **🗣️ Language Parsing**: Identifies client's preferred languages from Accept-Language header
- **💻 User Agent Analysis**: Captures browser and operating system information
- **🔒 CORS Support**: Enables cross-origin requests for remote testing
- **⚡ Lightweight**: Minimal dependencies and fast response times
- **🔧 Environment Flexible**: Configurable port settings via environment variables

## 🛠️ Technologies

### Core Technologies

- **🟢 Node.js**: JavaScript runtime environment
- **🚀 Express.js 4.21+**: Fast, unopinionated web framework
- **🌐 CORS**: Cross-Origin Resource Sharing middleware
- **⚙️ dotenv**: Environment variable management

### Development Tools

- **📦 npm**: Package management
- **🔄 nodemon**: Development server with auto-restart
- **🧪 Testing**: Manual testing via web interface

## 🚀 Installation

### Prerequisites

- **Node.js** 14.0 or higher
- **npm** 6.0 or higher

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/aliammari1/freecodecamp-headerparser-project.git
   cd freecodecamp-headerparser-project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional):
   ```bash
   # Create .env file
   echo "PORT=3000" > .env
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Visit the application**:
   ```
   http://localhost:3000
   ```

### Alternative Installation Methods

**Using yarn**:
```bash
yarn install
yarn start
```

**Development mode** (if you have nodemon installed):
```bash
npm run dev  # If dev script is configured
# or
npx nodemon index.js
```

## 📖 Usage

### Basic Usage

1. **Start the server** using one of the installation methods above
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Use the API endpoint** by visiting `http://localhost:3000/api/whoami`

### Integration Usage

```javascript
// Example: Fetch user info from your client application
fetch('https://your-deployed-app.com/api/whoami')
  .then(response => response.json())
  .then(data => {
    console.log('User IP:', data.ipaddress);
    console.log('User Language:', data.language);
    console.log('User Software:', data.software);
  });
```

## 🔌 API Endpoints

### GET `/api/whoami`

Returns information about the requesting client parsed from HTTP headers.

**Response Format**:
```json
{
  "ipaddress": "string",
  "language": "string",
  "software": "string"
}
```

**Header Sources**:
- `ipaddress`: Extracted from `x-forwarded-for` header
- `language`: Parsed from `accept-language` header
- `software`: Obtained from `user-agent` header

### GET `/api/hello`

A simple test endpoint that returns a greeting message.

**Response**:
```json
{
  "greeting": "hello API"
}
```

### GET `/`

Serves the main HTML interface with usage examples and API documentation.

## 📱 Example Responses

### Typical Response
```json
{
  "ipaddress": "::ffff:159.20.14.100",
  "language": "en-US,en;q=0.9,es;q=0.8",
  "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
```

### Mobile Device Response
```json
{
  "ipaddress": "192.168.1.100",
  "language": "en-US,en;q=0.9",
  "software": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1"
}
```

### Multiple Languages Response
```json
{
  "ipaddress": "203.0.113.42",
  "language": "fr-FR,fr;q=0.9,en;q=0.8,de;q=0.7",
  "software": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
```

## 🌐 Live Demo

🔗 **[View Live Demo](https://your-deployed-app.herokuapp.com/)**

Try the API endpoint: `https://your-deployed-app.herokuapp.com/api/whoami`

### Deployment Options

This application can be deployed on various platforms:

- **Heroku**: `git push heroku main`
- **Vercel**: Connect GitHub repository
- **Railway**: One-click deployment
- **DigitalOcean App Platform**: GitHub integration

## 🧪 Testing

### Manual Testing

1. **Browser Testing**:
   - Visit `http://localhost:3000/api/whoami`
   - Check response in different browsers
   - Test with different language settings

2. **Command Line Testing**:
   ```bash
   # Using curl
   curl http://localhost:3000/api/whoami
   
   # Using curl with custom headers
   curl -H "Accept-Language: es-ES,es;q=0.9" http://localhost:3000/api/whoami
   ```

3. **Network Tool Testing**:
   - Use Postman or Insomnia
   - Test with various header configurations
   - Verify CORS functionality

### Expected Test Results

- ✅ Returns valid JSON response
- ✅ Contains all three required fields
- ✅ IP address is properly extracted
- ✅ Language preferences are captured
- ✅ User agent string is complete

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Bug Reports
1. **Check existing issues** before creating new ones
2. **Provide detailed information** about the bug
3. **Include steps to reproduce** the issue

### Feature Requests
1. **Open an issue** describing the feature
2. **Explain the use case** and benefits
3. **Discuss implementation** approach

### Pull Requests
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** with clear commit messages
4. **Add tests** if applicable
5. **Submit a pull request** with detailed description

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Ali Ammari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

## 🙏 Acknowledgments

- **[freeCodeCamp](https://www.freecodecamp.org/)** - For providing the project requirements and learning platform
- **Express.js Community** - For the excellent web framework
- **Node.js Foundation** - For the powerful JavaScript runtime
- **Contributors** - Thank you to everyone who has contributed to this project

---

### 🔗 Related Projects

- [freeCodeCamp URL Shortener](https://github.com/aliammari1/freecodecamp-urlshortener-project)
- [freeCodeCamp File Metadata](https://github.com/aliammari1/freecodecamp-filemetadata-project)
- [freeCodeCamp Timestamp](https://github.com/aliammari1/freecodecamp-timestamp-project)

### 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [HTTP Headers Reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
- [freeCodeCamp Curriculum](https://www.freecodecamp.org/learn)

---

**Made with ❤️ by [Ali Ammari](https://github.com/aliammari1)**

## Repository Visualization
![Repository Visualization](https://raw.githubusercontent.com/aliammari1/freecodecamp-headerparser-project/main/assets/repo_image_freecodecamp-headerparser-project.png)