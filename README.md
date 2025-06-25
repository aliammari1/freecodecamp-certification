# Exercise Tracker API

A full-stack exercise tracking application built with Node.js, Express, and MongoDB as part of the freeCodeCamp Backend Development certification.

## 🚀 Features

- **User Management**: Create and retrieve user accounts
- **Exercise Logging**: Add exercises with description, duration, and date
- **Exercise History**: View complete exercise logs for users
- **Advanced Filtering**: Filter exercises by date range and limit results
- **RESTful API**: Clean API endpoints following REST conventions
- **MongoDB Integration**: Persistent data storage with Mongoose
- **Interactive Frontend**: HTML forms for easy testing and interaction

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling for Node.js
- **CORS**: Cross-origin resource sharing middleware
- **dotenv**: Environment variable management
- **HTML/CSS/JavaScript**: Frontend interface

## 📋 API Endpoints

### Create New User
```http
POST /api/users
```

**Request Body:**
```json
{
  "username": "john_doe"
}
```

**Response:**
```json
{
  "username": "john_doe",
  "_id": "507f1f77bcf86cd799439011"
}
```

### Get All Users
```http
GET /api/users
```

**Response:**
```json
[
  {
    "username": "john_doe",
    "_id": "507f1f77bcf86cd799439011"
  },
  {
    "username": "jane_smith",
    "_id": "507f1f77bcf86cd799439012"
  }
]
```

### Add Exercise
```http
POST /api/users/:_id/exercises
```

**Request Body:**
```json
{
  "description": "Running",
  "duration": 30,
  "date": "2023-01-01"
}
```

**Response:**
```json
{
  "username": "john_doe",
  "description": "Running",
  "duration": 30,
  "date": "Mon Jan 01 2023",
  "_id": "507f1f77bcf86cd799439011"
}
```

### Get Exercise Log
```http
GET /api/users/:_id/logs?[from][&to][&limit]
```

**Query Parameters:**
- `from` (optional): Start date (YYYY-MM-DD)
- `to` (optional): End date (YYYY-MM-DD)
- `limit` (optional): Maximum number of exercises to return

**Example:**
```http
GET /api/users/507f1f77bcf86cd799439011/logs?from=2023-01-01&to=2023-12-31&limit=10
```

**Response:**
```json
{
  "username": "john_doe",
  "count": 2,
  "_id": "507f1f77bcf86cd799439011",
  "log": [
    {
      "description": "Running",
      "duration": 30,
      "date": "Mon Jan 01 2023"
    },
    {
      "description": "Cycling",
      "duration": 45,
      "date": "Tue Jan 02 2023"
    }
  ]
}
```

## 🔧 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/aliammari1/freecodecamp-exercisetracker-project.git
   cd freecodecamp-exercisetracker-project
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp sample.env .env
   ```
   
   Edit `.env` and add your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/exercise-tracker
   PORT=3000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application.

## 📖 Usage

### Using the Web Interface

1. **Create a User:**
   - Enter a username in the "Create a New User" form
   - Click "Submit" to create the user
   - Note the returned user ID for adding exercises

2. **Add Exercises:**
   - Use the user ID from step 1
   - Fill in the exercise description and duration (required)
   - Optionally specify a date (defaults to current date)
   - Click "Submit" to add the exercise

3. **View Exercise Logs:**
   - Use the GET endpoint format shown on the page
   - Add query parameters for filtering as needed

### Using the API Directly

```bash
# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser"

# Add an exercise
curl -X POST http://localhost:3000/api/users/USER_ID/exercises \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "description=Running&duration=30&date=2023-01-01"

# Get exercise log
curl http://localhost:3000/api/users/USER_ID/logs
```

## 📁 Project Structure

```
freecodecamp-exercisetracker-project/
├── index.js              # Main server file with API routes
├── package.json          # Node.js dependencies and scripts
├── sample.env            # Environment variables template
├── views/
│   └── index.html        # Frontend interface
├── public/               # Static files
│   └── style.css         # Styling
└── assets/               # Project assets
```

## 🗃️ Database Schema

### Log Collection
```javascript
{
  username: String,
  count: Number,
  log: [
    {
      description: String,
      duration: Number,
      date: String
    }
  ]
}
```

## 🧪 Testing

This project is designed to pass the freeCodeCamp test suite. You can test it by:

1. Running the application locally
2. Using the freeCodeCamp test interface to verify all requirements
3. Testing the API endpoints manually with curl or a REST client
4. Using the web interface to create users and add exercises

## ⚠️ Environment Setup

Make sure you have:
- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string
- Proper environment variables configured in `.env`

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
- MongoDB integration with Mongoose
- Data validation and error handling
- Date manipulation and filtering
- CRUD operations in a web application
- Environment variable management

## 🔗 Related Projects

This is part of the freeCodeCamp Backend Development and APIs certification. Other related projects include:
- Timestamp Microservice
- URL Shortener Microservice
- File Metadata Microservice
- Request Header Parser

## 📞 Contact

**Ali Ammari**
- GitHub: [@aliammari1](https://github.com/aliammari1)
- LinkedIn: [Ali Ammari](https://www.linkedin.com/in/ali-ammari-dev/)

---

⭐ Star this repository if you found it helpful!

## Repository Visualization
![Repository Visualization](https://raw.githubusercontent.com/aliammari1/freecodecamp-exercisetracker-project/main/assets/repo_image_freecodecamp-exercisetracker-project.png)