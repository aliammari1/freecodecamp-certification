# Timestamp Microservice

A simple timestamp microservice API built with Node.js and Express as part of the freeCodeCamp Backend Development certification.

## 🚀 Features

- **Date Parsing**: Converts date strings to Unix timestamps and UTC format
- **Multiple Input Formats**: Accepts both date strings (YYYY-MM-DD) and Unix timestamps
- **Current Time API**: Returns current timestamp when no date is provided
- **Error Handling**: Returns appropriate error messages for invalid dates
- **CORS Enabled**: Cross-origin resource sharing enabled for remote testing

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **CORS**: Cross-origin resource sharing middleware
- **HTML/CSS**: Frontend interface

## 📋 API Endpoints

### GET /api/:date

Returns timestamp information for a given date.

**Parameters:**
- `date` (string): Date in YYYY-MM-DD format or Unix timestamp

**Example Requests:**
```
GET /api/2015-12-25
GET /api/1451001600000
```

**Example Response:**
```json
{
  "unix": 1451001600000,
  "utc": "Fri, 25 Dec 2015 00:00:00 GMT"
}
```

### GET /api/

Returns current timestamp when no date parameter is provided.

**Example Response:**
```json
{
  "unix": 1704067200000,
  "utc": "Mon, 01 Jan 2024 00:00:00 GMT"
}
```

### Error Response

For invalid dates:
```json
{
  "error": "Invalid Date"
}
```

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aliammari1/freecodecamp-timestamp-project.git
   cd freecodecamp-timestamp-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application.

## 📖 Usage

### Using the Web Interface

1. Open the application in your browser
2. View the example usage and output
3. Test the API endpoints using the provided examples

### Using the API Directly

You can make HTTP requests to the API endpoints:

```bash
# Get timestamp for a specific date
curl http://localhost:3000/api/2015-12-25

# Get timestamp for Unix time
curl http://localhost:3000/api/1451001600000

# Get current timestamp
curl http://localhost:3000/api/
```

## 📁 Project Structure

```
freecodecamp-timestamp-project/
├── index.js              # Main server file
├── package.json          # Node.js dependencies and scripts
├── views/
│   └── index.html        # Frontend interface
└── public/               # Static files
    └── style.css         # Styling
```

## 🧪 Testing

This project is designed to pass the freeCodeCamp test suite. You can test it by:

1. Running the application locally
2. Using the freeCodeCamp test interface to verify all requirements
3. Testing the API endpoints manually with curl or a REST client

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Learning Objectives

This project demonstrates:
- Building RESTful APIs with Express.js
- Date manipulation and formatting in JavaScript
- Error handling in web applications
- CORS configuration for cross-origin requests
- Node.js server setup and routing

## 🔗 Related Projects

This is part of the freeCodeCamp Backend Development and APIs certification. Other related projects include:
- URL Shortener Microservice
- Exercise Tracker
- File Metadata Microservice
- Request Header Parser

## 📞 Contact

**Ali Ammari**
- GitHub: [@aliammari1](https://github.com/aliammari1)
- LinkedIn: [Ali Ammari](https://www.linkedin.com/in/ali-ammari-dev/)

---

⭐ Star this repository if you found it helpful!

## Repository Visualization
![Repository Visualization](https://raw.githubusercontent.com/aliammari1/freecodecamp-timestamp-project/main/assets/repo_image_freecodecamp-timestamp-project.png)