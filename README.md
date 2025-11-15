# 🏥 Medical Inventory Management System

A modern, full-stack medical inventory management application for tracking pharmaceutical stock, built with React and Express.js.

## ✨ Features

- **📊 Real-time Inventory Tracking** - Monitor medicine stock levels with visual indicators
- **🔍 Smart Search** - Quickly find medicines by name
- **📈 Stock Status** - Color-coded stock levels (High/Medium/Low)
- **📑 Pagination** - Efficiently browse through large inventory lists
- **💊 Comprehensive Data** - Track medicine categories, prices, and quantities
- **🎨 Modern UI** - Beautiful, responsive interface with Tailwind CSS
- **🔄 Live Updates** - Refresh data on-demand
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library
- **Vite 7.1.7** - Fast build tool and dev server
- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **Axios 1.13.2** - HTTP client for API requests
- **Lucide React** - Beautiful icon library

### Backend
- **Express.js 5.1.0** - Web application framework
- **Node.js** - JavaScript runtime
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variable management

### DevOps
- **Docker & Docker Compose** - Containerization and orchestration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerized deployment)

## 🛠️ Installation & Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashwan1-yadav/Medical-Inventory.git
   cd Medical-Inventory
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

4. **Stop the containers**
   ```bash
   docker-compose down
   ```

### Option 2: Local Development Setup

#### Backend Setup

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   # Or create .env manually with:
   # PORT=3000
   # CLIENT_URL=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   The server will run on http://localhost:3000

#### Frontend Setup

1. **Navigate to client directory** (in a new terminal)
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   # Or create .env manually with:
   # VITE_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will run on http://localhost:5173

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Endpoints

#### Get All Medicines
```http
GET /api/v1/medicine
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Paracetamol",
    "category": "Antibiotics",
    "stock": 100,
    "price": 10
  },
  ...
]
```

**Response Codes:**
- `200 OK` - Success

## 🏗️ Project Structure

```
Medical-Inventory/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── App.jsx         # Main component with medicine table
│   │   ├── main.jsx        # Application entry point
│   │   └── index.css       # Global styles
│   ├── public/             # Static assets
│   ├── Dockerfile          # Client Docker configuration
│   └── package.json        # Frontend dependencies
│
├── server/                 # Backend Express application
│   ├── app.js             # Main server file with API routes
│   ├── Dockerfile         # Server Docker configuration
│   └── package.json       # Backend dependencies
│
└── docker-compose.yml     # Docker orchestration configuration
```

## 🎯 Available Scripts

### Client (Frontend)

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Server (Backend)

```bash
npm start        # Start the server
npm test         # Run tests (if available)
```

## 🐳 Docker Configuration

### Services

- **server**: Backend API (Port 3000)
- **client**: Frontend application (Port 5173)
- **network**: Bridge network for inter-service communication

### Container Management

```bash
# Build and start containers
docker-compose up --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Remove volumes
docker-compose down -v
```

## 🌟 Features Walkthrough

### Dashboard Overview
- View total medicine count
- Track low stock items (≤50 units)
- Monitor high stock items (>100 units)

### Medicine Table
- **ID**: Unique identifier for each medicine
- **Name**: Medicine name with icon
- **Category**: Medicine classification
- **Stock**: Current quantity with unit count
- **Price**: Medicine price in INR (₹)
- **Status**: Visual stock level indicator

### Stock Status Indicators
- 🟢 **High Stock** - More than 100 units
- 🟡 **Medium Stock** - 51-100 units
- 🔴 **Low Stock** - 50 or fewer units

## 🔧 Environment Variables

### Server (.env)
```env
PORT=3000
CLIENT_URL=http://localhost:5173
```

### Client (.env)
```env
VITE_API_URL=http://localhost:3000
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Ashwan1-yadav**
- GitHub: [@Ashwan1-yadav](https://github.com/Ashwan1-yadav)

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first framework
- Lucide for the beautiful icons
- Express.js community

---

Made with ❤️ for better healthcare management
