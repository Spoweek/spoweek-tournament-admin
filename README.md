# SPOWEEK Tournament Admin

A modern React Native web application for managing tournaments, users, and administrative tasks for SPOWEEK events.

## 🎯 Project Overview

The SPOWEEK Tournament Admin is a comprehensive administrative dashboard designed to streamline tournament management operations. Built with React Native and Expo, it provides a responsive web interface for managing users, tournaments, and administrative functions.

### Key Features

- **User Management**: Create, view, and manage user accounts
- **Tournament Administration**: Handle tournament creation, management, and oversight
- **Authentication System**: Secure login with Laravel API integration
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Real-time Updates**: Live data synchronization with backend services

## 🏗️ Architecture

### Technology Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API
- **Styling**: React Native StyleSheet
- **Backend Integration**: Laravel API
- **Containerization**: Docker & Docker Compose

### Project Structure

```
spoweek-tournament-admin/
├── app/                   # Expo Router file-based routing
│   ├── _layout.tsx        # Root layout
│   ├── index.tsx          # Home page (auth redirect)
│   ├── login/             # Login screens
│   │   └── index.tsx      # Login page
│   ├── dashboard/         # Dashboard screens
│   │   └── index.tsx      # Dashboard page
│   └── design/            # Design system screens
│       └── index.tsx      # Design showcase page
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Generic components
│   │   ├── design/       # Design system components
│   │   └── forms/        # Form-specific components
│   ├── layouts/          # Layout components
│   ├── context/          # React Context for state
│   ├── services/         # API and business logic
│   └── utils/            # Utility functions
├── config.js             # Environment configuration
├── App.js                # Expo Router entry point
├── package.json          # Dependencies and scripts
├── Dockerfile           # Container configuration
└── docker-compose.yml   # Multi-container setup
```

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose**: For containerized development
- **Node.js**: Version 18+ (for local development)
- **Laravel API**: SPOWEEK Tournament API running on the network

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd spoweek-tournament-admin
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Web Interface: http://localhost:19006
   - Metro Bundler: http://localhost:8081

### Development Setup

#### Using Docker (Recommended)

1. **Build and start containers**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

2. **View logs**
   ```bash
   docker-compose logs -f
   ```

3. **Stop the application**
   ```bash
   docker-compose down
   ```

#### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   # or
   npm run web
   ```

## 🔧 Configuration

### Environment Configuration

The application uses `config.js` for environment-specific settings:

```javascript
const config = {
  development: {
    API_BASE_URL: 'http://localhost:80',
  },
  production: {
    API_BASE_URL: 'https://your-production-api.com',
  },
  staging: {
    API_BASE_URL: 'https://your-staging-api.com',
  }
};
```

### API Integration

The application connects to the SPOWEEK Laravel API:

- **Authentication**: `/api/v1/auth/login`
- **User Management**: `/api/v1/users/*`
- **Tournament Management**: `/api/v1/tournaments/*`

### Docker Network Configuration

The application runs on the `spoweek-network` Docker network to communicate with other SPOWEEK services:

```bash
# Connect Laravel API to the network
docker network connect spoweek-network spoweek-tournament-api-laravel.test-1
docker network connect spoweek-network spoweek-tournament-api-pgsql-1
docker network connect spoweek-network spoweek-tournament-api-redis-1
docker network connect spoweek-network spoweek-tournament-api-mailpit-1
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Bundle Loading Errors

**Error**: `GET http://localhost:19006/index.bundle net::ERR_ABORTED 500`

**Solution**:
```bash
# Rebuild the container
docker-compose down
docker-compose build
docker-compose up -d
```

#### 2. API Connection Issues

**Error**: `net::ERR_NAME_NOT_RESOLVED`

**Solution**:
- Ensure Laravel API containers are connected to `spoweek-network`
- Check that `API_BASE_URL` in `config.js` matches your setup
- Verify network connectivity between containers

#### 3. Version Compatibility Issues

**Error**: Package version mismatches

**Solution**:
```bash
# Update package-lock.json
npm install
# Rebuild container
docker-compose build
```

#### 4. Navigation Errors

**Error**: `Unable to resolve expo-router`

**Solution**:
- Ensure expo-router is installed: `npm install expo-router`
- Check that app.json has expo-router configuration
- Rebuild the container

### Debug Commands

```bash
# Check container status
docker ps

# View container logs
docker-compose logs -f

# Access container shell
docker exec -it spoweek-tournament-admin sh

# Check network connectivity
docker network inspect spoweek-network

# Test API connectivity
docker exec -it spoweek-tournament-admin curl http://spoweek-tournament-api-laravel.test-1:80/api/health
```

## 📱 Available Scripts

- `npm start` - Start Expo development server
- `npm run web` - Start web development server
- `npm run android` - Start Android development
- `npm run ios` - Start iOS development

## 🔐 Security Considerations

- **API Authentication**: All API calls require proper authentication tokens
- **Environment Variables**: Sensitive configuration is handled through environment variables
- **Network Security**: Services communicate through isolated Docker networks
- **Input Validation**: All user inputs are validated on both client and server

## 🚀 Deployment

### Production Deployment

1. **Update configuration**
   ```javascript
   // config.js
   production: {
     API_BASE_URL: 'https://your-production-api.com',
   }
   ```

2. **Set environment**
   ```bash
   export NODE_ENV=production
   ```

3. **Build and deploy**
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Staging Deployment

1. **Update staging configuration**
2. **Deploy to staging environment**
3. **Run integration tests**

## 📊 Monitoring & Logs

### Application Logs

```bash
# View real-time logs
docker-compose logs -f

# View specific service logs
docker-compose logs expo
```

### Health Checks

- **Web Interface**: http://localhost:19006
- **Metro Bundler**: http://localhost:8081
- **API Health**: http://localhost:80/api/health

## 🤝 Development Guidelines

### Code Style

- Use functional components with hooks
- Follow React Native best practices
- Implement proper error handling
- Use TypeScript for type safety (future enhancement)

### Git Workflow

1. Create feature branches from `main`
2. Use descriptive commit messages
3. Test changes locally before pushing
4. Create pull requests for code review

### Testing

- Unit tests for utility functions
- Integration tests for API calls
- E2E tests for critical user flows

## 📞 Support

For technical support or questions:

- **Internal Documentation**: SPOWEEK Confluence
- **Issue Tracking**: Internal Jira/Issue Tracker
- **Team Communication**: SPOWEEK Slack Channels

## 📄 License

This project is proprietary software owned by SPOWEEK. All rights reserved.

---

**Last Updated**: September 2024  
**Version**: 1.0.0  
**Maintained by**: SPOWEEK Development Team
