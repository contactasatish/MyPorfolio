# Portfolio Backend API Contracts

## Overview
Backend will provide comprehensive functionality for portfolio management including contact forms, analytics, admin panel, and file downloads.

## API Endpoints

### 1. Portfolio Data Management
- `GET /api/portfolio` - Get complete portfolio data
- `PUT /api/portfolio` - Update portfolio data (admin only)

### 2. Contact Management
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)
- `PUT /api/contact/{id}` - Mark message as read/replied

### 3. Analytics
- `POST /api/analytics/view` - Track page/section views
- `GET /api/analytics/stats` - Get analytics data (admin only)

### 4. File Management
- `GET /api/resume/download` - Download resume PDF
- `POST /api/resume/upload` - Upload new resume (admin only)

### 5. Admin Authentication
- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/verify` - Verify token

## Data Models

### Contact Message
```json
{
  "id": "string",
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string",
  "timestamp": "datetime",
  "status": "unread|read|replied",
  "ip_address": "string"
}
```

### Analytics Event
```json
{
  "id": "string",
  "event_type": "page_view|section_view|download|contact",
  "section": "string|null",
  "timestamp": "datetime",
  "ip_address": "string",
  "user_agent": "string"
}
```

### Portfolio Data
```json
{
  "personal": {...},
  "about": {...},
  "skills": [...],
  "experience": [...],
  "projects": [...]
}
```

## Frontend Integration
- Remove mock.js data usage
- Integrate API calls for all data
- Add contact form functionality
- Add analytics tracking
- Add admin panel interface
- Add resume download feature

## Error Handling
- Proper HTTP status codes
- Comprehensive error messages
- Rate limiting for contact form
- Input validation and sanitization