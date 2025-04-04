# Store Rating Application

A modern web application for managing and rating stores, built with React and Node.js. This application allows users to register, search for stores, and provide ratings while giving store owners and administrators specific functionalities.

## Features

### For Users
- User registration and authentication
- Search stores by name or address
- View store details
- Rate stores
- View personal profile

### For Store Owners
- View store ratings
- Access store statistics
- Manage store information

### For Administrators
- View system statistics
- Manage users and stores
- Access admin dashboard

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- CSS3 for styling
- JWT for authentication

### Backend
- Node.js
- Express.js
- SQLite database
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies for both frontend and backend:

Frontend:
```bash
cd client/store-rating-app
npm install
```

Backend:
```bash
cd server
npm install
```

3. Set up environment variables:
Create a `.env` file in the server directory with:
```
JWT_SECRET=your_jwt_secret
PORT=3001
```

### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd client/store-rating-app
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - User login

### Stores
- `GET /stores` - Get all stores
- `GET /stores/search` - Search stores
- `POST /stores` - Create a new store (Admin only)

### Ratings
- `POST /ratings` - Submit a store rating
- `PUT /ratings` - Update a store rating
- `GET /store/ratings` - Get store ratings (Store Owner only)
- `GET /store/average-rating` - Get store average rating (Store Owner only)

### Admin
- `GET /admin/stats` - Get system statistics
- `GET /users` - Get all users (Admin only)

## User Roles

1. **User**
   - Can search stores
   - Can rate stores
   - Can view personal profile

2. **Store Owner**
   - Can view store ratings
   - Can access store statistics
   - Can manage store information

3. **Admin**
   - Full access to all features
   - Can manage users and stores
   - Can view system statistics

## Features in Detail

### Dashboard
- Welcome message with user information
- System statistics (for admin)
- Search functionality for stores
- Display of available stores
- Responsive design for all screen sizes

### Search Functionality
- Real-time search as you type
- Search by store name or address
- Clean and intuitive interface
- Mobile-responsive design

### Store Cards
- Display store information
- Interactive hover effects
- Clean and modern design
- Responsive grid layout

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React.js team for the amazing frontend framework
- Express.js team for the backend framework
- All contributors who have helped with the project
#   R o x i l e r - f r o n t e n d  
 