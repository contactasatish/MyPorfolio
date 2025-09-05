# Admin Panel Credentials & Setup

## 🔐 Default Admin Credentials

**For Full-Stack Deployment (with Backend):**

```
Username: admin
Password: admin123
```

⚠️ **SECURITY WARNING:** Change these default credentials immediately after first login!

## 🛠️ Setup Instructions

### 1. First Time Setup
1. Deploy the full-stack version (not GitHub Pages)
2. Access admin panel at: `https://your-domain.com/#admin`
3. Login with default credentials above
4. **Immediately change credentials** using the credentials manager

### 2. Changing Admin Credentials

#### Method 1: Through Admin Panel UI
1. Login to admin panel
2. Click "Show Credentials Manager" on login page
3. Enter new username and password
4. Confirm password
5. Click "Update Credentials"
6. Re-login with new credentials

#### Method 2: Backend API (for developers)
```bash
curl -X PUT https://your-backend-url/api/admin/credentials \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "your_new_username",
    "password": "your_new_password"
  }'
```

### 3. Password Requirements
- Minimum 6 characters
- No special character requirements (can be added for enhanced security)
- Case sensitive

## 🌐 Deployment-Specific Notes

### GitHub Pages (Static Hosting)
- ❌ Admin panel **NOT AVAILABLE** (no backend)
- Shows informational message about full-stack requirement
- Contact developer for access: contactasatish@gmail.com

### Full-Stack Deployment (Emergent/Other)
- ✅ Full admin functionality available
- ✅ Credentials can be updated
- ✅ Analytics and contact form management
- ✅ Photo upload functionality

## 🔧 Backend Implementation

The admin credentials are handled in:
- `backend/auth.py` - Authentication logic
- `backend/server.py` - Admin routes
- Default credentials stored in environment or hardcoded for demo

### Admin API Endpoints
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Token verification  
- `PUT /api/admin/credentials` - Update credentials
- `GET /api/analytics/stats` - Analytics data
- `GET /api/contact` - Contact messages
- `PUT /api/contact/{id}` - Update message status

## 🔒 Security Best Practices

1. **Change Default Credentials** immediately
2. **Use Strong Passwords** (8+ characters, mixed case, numbers)
3. **Regular Updates** - Change credentials periodically
4. **Access Control** - Limit admin panel access to trusted IPs if possible
5. **HTTPS Only** - Always use secure connections
6. **Token Management** - JWT tokens expire after 1 hour

## 🐛 Troubleshooting

### "Invalid Credentials" Error
1. Verify you're using the correct username/password
2. Check if you're on GitHub Pages (admin not available)
3. Ensure backend is running and accessible
4. Check browser console for network errors

### Cannot Update Credentials
1. Verify you're authenticated with valid token
2. Check backend logs for errors
3. Ensure endpoint is implemented in backend
4. Try logging out and back in

### Admin Panel Not Loading
1. Verify backend URL is correct
2. Check CORS settings
3. Verify all admin routes are properly configured
4. Check browser network tab for failed requests

## 📞 Support

For admin access issues or credential reset:
- **Email**: contactasatish@gmail.com
- **Phone**: 347-341-7341
- **LinkedIn**: linkedin.com/in/asatishkr

---
**Last Updated**: September 2025
**Version**: 1.0.0