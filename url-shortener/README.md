# freecodecamp-urlshortener-project

A modern URL shortener microservice built as part of the freeCodeCamp API projects curriculum. This project provides a simple and efficient way to shorten long URLs and redirect users to the original links.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **URL Validation**: Ensures only valid URLs are processed
- **RESTful API**: Clean API endpoints for URL operations
- **JSON Response**: Returns structured JSON data for all operations
- **Error Handling**: Proper error messages for invalid URLs
- **Web Interface**: Simple HTML form for easy URL submission
- **Express.js Backend**: Fast and lightweight server implementation

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3
- **Development**: Nodemon for hot reloading
- **Package Management**: npm

## 📦 Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/aliammari1/freecodecamp-urlshortener-project.git
   cd freecodecamp-urlshortener-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp sample.env .env
   # Edit .env file with your configuration
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **For production**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## 🎯 Usage

### Web Interface

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a valid URL in the input field
3. Click "POST URL" to generate a shortened URL
4. Use the returned short URL to redirect to the original link

### API Endpoints

#### POST /api/shorturl
Create a shortened URL.

**Request Body:**
```json
{
  "url": "https://www.example.com"
}
```

**Response (Success):**
```json
{
  "original_url": "https://www.example.com",
  "short_url": 1
}
```

**Response (Error):**
```json
{
  "error": "invalid url"
}
```

#### GET /api/shorturl/:id
Redirect to the original URL using the short URL ID.

**Example:**
```
GET /api/shorturl/1
```
Redirects to the original URL associated with ID 1.

## 📁 Project Structure

```
freecodecamp-urlshortener-project/
├── public/
│   └── style.css          # Styling for the web interface
├── views/
│   └── index.html         # Main HTML page
├── assets/
│   └── repo_image_freecodecamp-urlshortener-project.png
├── index.js               # Main server file
├── package.json           # Project dependencies
├── nodemon.json          # Nodemon configuration
├── sample.env            # Environment variables template
└── README.md             # Project documentation
```

## 🚦 API Testing

You can test the API using tools like Postman, curl, or any HTTP client:

```bash
# Test URL shortening
curl -X POST http://localhost:3000/api/shorturl \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.freecodecamp.org"}'

# Test URL redirection
curl -L http://localhost:3000/api/shorturl/1
```

## 🎨 Customization

- **Styling**: Modify `public/style.css` to change the appearance
- **HTML**: Update `views/index.html` to modify the interface
- **Server Logic**: Edit `index.js` to add new features or modify behavior

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Requirements

This project fulfills the following freeCodeCamp requirements:

- ✅ You can POST a URL to `/api/shorturl` and get a JSON response with `original_url` and `short_url` properties
- ✅ When you visit `/api/shorturl/<short_url>`, you will be redirected to the original URL
- ✅ If you pass an invalid URL that doesn't follow the valid `http://www.example.com` format, the JSON response will contain `{ error: 'invalid url' }`

## 📄 License

This project is part of the freeCodeCamp curriculum and is available under the MIT License.

## 🙏 Acknowledgments

- [freeCodeCamp](https://www.freecodecamp.org/) for the project requirements and learning platform
- Express.js community for the excellent documentation
- Node.js community for the robust runtime environment

## 📧 Contact

**Ali Ammari** - [GitHub Profile](https://github.com/aliammari1)

Project Link: [https://github.com/aliammari1/freecodecamp-urlshortener-project](https://github.com/aliammari1/freecodecamp-urlshortener-project)

---

*This project is part of the freeCodeCamp Back End Development and APIs certification.*

## Repository Visualization
![Repository Visualization](https://raw.githubusercontent.com/aliammari1/freecodecamp-urlshortener-project/main/assets/repo_image_freecodecamp-urlshortener-project.png)