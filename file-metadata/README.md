# FreeCodeCamp File Metadata Microservice

A file metadata microservice built as part of the FreeCodeCamp Back End Development and APIs certification. This API allows users to upload files and retrieve metadata information including file name, type, and size.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🚀 Features

- **File Upload**: Upload files using multipart form data
- **Metadata Extraction**: Extract file name, MIME type, and size
- **RESTful API**: Simple and clean API endpoints
- **File Type Support**: Supports various file types and formats
- **Real-time Processing**: Instant file analysis upon upload

## 🛠️ Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Multer**: Middleware for handling multipart/form-data
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment variable management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/aliammari1/freecodecamp-filemetadata-project.git
   cd freecodecamp-filemetadata-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp sample.env .env
   # Edit .env with your configuration
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:3000
   ```

## 🎯 Usage

### API Endpoints

#### Upload File
- **POST** `/api/fileanalyse`
- **Content-Type**: `multipart/form-data`
- **Form field**: `upfile`

**Example Response:**
```json
{
  "name": "example.txt",
  "type": "text/plain",
  "size": 1024
}
```

#### Get Last Uploaded File Info
- **GET** `/api/fileanalyse`

**Example Response:**
```json
{
  "name": "example.txt",
  "type": "text/plain",
  "size": 1024
}
```

### Using the Web Interface

1. Navigate to the main page
2. Select a file using the file input
3. Click "Upload" to analyze the file
4. View the metadata response

### Using cURL

```bash
# Upload a file
curl -X POST -F "upfile=@/path/to/your/file.txt" http://localhost:3000/api/fileanalyse

# Get last uploaded file info
curl http://localhost:3000/api/fileanalyse
```

## 📁 Project Structure

```
freecodecamp-filemetadata-project/
├── public/             # Static files (CSS, client-side JS)
├── views/              # HTML templates
├── uploads/            # Temporary file storage
├── index.js            # Main server file
├── package.json        # Dependencies and scripts
├── sample.env          # Environment variables template
└── README.md           # Project documentation
```

## 🔧 Configuration

The application uses the following environment variables:

- `PORT`: Server port (default: 3000)

## 🧪 Testing

Test the API using various file types:

```bash
# Test with different file types
curl -X POST -F "upfile=@test.pdf" http://localhost:3000/api/fileanalyse
curl -X POST -F "upfile=@image.jpg" http://localhost:3000/api/fileanalyse
curl -X POST -F "upfile=@document.docx" http://localhost:3000/api/fileanalyse
```

## 🔍 API Response Format

The API returns file metadata in the following format:

```typescript
interface FileMetadata {
  name: string;    // Original filename
  type: string;    // MIME type
  size: number;    // File size in bytes
}
```

## 🚀 Deployment

### Local Development
```bash
npm start
```

### Production Deployment
1. Set environment variables
2. Install production dependencies: `npm ci --only=production`
3. Start the application: `npm start`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📚 Learning Resources

This project is part of the FreeCodeCamp curriculum:
- [Back End Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/)
- [File Metadata Microservice](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/file-metadata-microservice)

## 🏷️ Tags

`nodejs` `express` `multer` `file-upload` `microservice` `freecodecamp` `backend` `api` `javascript`

## 👨‍💻 Author

**Ali Ammari**
- GitHub: [@aliammari1](https://github.com/aliammari1)
- Portfolio: [aliammari.netlify.app](https://aliammari.netlify.app)

---

⭐ Star this repository if you found it helpful!