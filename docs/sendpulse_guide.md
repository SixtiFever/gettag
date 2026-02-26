# SendPulse Email Integration Guide

This guide explains how to integrate SendPulse email collection and storage into your React application. The implementation uses Firebase Cloud Functions as a proxy to securely handle SendPulse API authentication.

## Architecture Overview

```
Frontend (React) → Firebase Cloud Function → SendPulse API
```

The integration consists of:
1. **Frontend**: React signup form that collects emails
2. **Backend**: Firebase Cloud Function that handles SendPulse authentication
3. **Storage**: SendPulse address book for email storage

## Prerequisites

- SendPulse account with API access
- Firebase project with Cloud Functions enabled
- Node.js 22+ for local development

## Setup Steps

### 1. SendPulse Configuration

1. **Get API Credentials**:
   - Log into your SendPulse account
   - Go to Settings → API
   - Note your `Client ID` and `Client Secret`

2. **Create Address Book**:
   - In SendPulse, create a new address book for storing emails
   - Note the address book ID (found in the URL or address book settings)

### 2. Firebase Cloud Function Setup

#### Install Dependencies

```bash
cd functions
npm install firebase-functions firebase-admin node-fetch
```

#### Create the Token Endpoint (`functions/index.js`)

```javascript
const {onRequest} = require("firebase-functions/v2/https");
const {defineString} = require("firebase-functions/params");
const fetch = require("node-fetch");

// Define parameters for environment variables
const clientId = defineString("SENDPULSE_CLIENT_ID");
const clientSecret = defineString("SENDPULSE_CLIENT_SECRET");

exports.getSendPulseToken = onRequest({
  region: "europe-west2", // Choose your preferred region
}, async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const id = clientId.value();
    const secret = clientSecret.value();

    if (!id || !secret) {
      throw new Error("SendPulse credentials not configured");
    }

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: id,
      client_secret: secret,
    });

    const response = await fetch("https://api.sendpulse.com/oauth/access_token", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`SendPulse API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching SendPulse token:", error);
    res.status(500).json({error: error.message});
  }
});
```

#### Configure Environment Variables

Set your SendPulse credentials in Firebase:

```bash
firebase functions:config:set sendpulse.client_id="your_client_id"
firebase functions:config:set sendpulse.client_secret="your_client_secret"
```

Or use the newer parameter approach (recommended):

```bash
firebase functions:secrets:set SENDPULSE_CLIENT_ID
firebase functions:secrets:set SENDPULSE_CLIENT_SECRET
```

#### Deploy the Function

```bash
firebase deploy --only functions
```

### 3. Frontend Configuration

#### Create Runtime Configuration (`src/lib/runtimeConfig.ts`)

```typescript
export type RuntimeConfig = {
  sendpulseTokenEndpoint?: string;
  sendpulseAddressbookId?: string;
};

declare global {
  interface Window {
    __APP_CONFIG__?: RuntimeConfig;
  }
}

const CONFIG_PATH = '/app-config.json';

export async function getRuntimeConfig(): Promise<RuntimeConfig> {
  if (typeof window !== 'undefined' && window.__APP_CONFIG__) {
    return window.__APP_CONFIG__ as RuntimeConfig;
  }
  try {
    const resp = await fetch(CONFIG_PATH, { cache: 'no-cache' });
    if (!resp.ok) {
      return {} as RuntimeConfig;
    }
    const data = (await resp.json()) as RuntimeConfig;
    try {
      if (typeof window !== 'undefined') {
        window.__APP_CONFIG__ = data;
      }
    } catch {}
    return data;
  } catch {
    return {} as RuntimeConfig;
  }
}
```

#### Create App Configuration (`public/app-config.json`)

```json
{
  "sendpulseTokenEndpoint": "https://your-firebase-function-url",
  "sendpulseAddressbookId": "your_addressbook_id"
}
```

#### Create the Signup Form Component (`src/components/SignupForm.tsx`)

```typescript
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getRuntimeConfig } from '../lib/runtimeConfig';

interface FormData {
  email: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ email: '' });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
  
  // Token management
  const TOKEN_STORAGE_KEY = 'sendpulse_access_token';
  const TOKEN_EXPIRY_STORAGE_KEY = 'sendpulse_token_expiry_ms';

  const readStoredToken = (): { token: string | null; expiryMs: number | null } => {
    try {
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      const expiryStr = localStorage.getItem(TOKEN_EXPIRY_STORAGE_KEY);
      return { token, expiryMs: expiryStr ? Number(expiryStr) : null };
    } catch {
      return { token: null, expiryMs: null };
    }
  };

  const writeStoredToken = (token: string, expiryMs: number) => {
    try {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
      localStorage.setItem(TOKEN_EXPIRY_STORAGE_KEY, String(expiryMs));
    } catch {}
  };

  const fetchNewToken = async (): Promise<string | null> => {
    const cfg = await getRuntimeConfig();
    const proxyEndpoint = cfg.sendpulseTokenEndpoint;
    try {
      if (proxyEndpoint) {
        const resp = await fetch(proxyEndpoint, { method: 'POST' });
        if (!resp.ok) {
          console.error('Proxy token endpoint failed', await resp.text());
          return null;
        }
        const data: { access_token: string; expires_in: number } = await resp.json();
        const expiryMs = Date.now() + Math.max(0, (data.expires_in - 30) * 1000);
        writeStoredToken(data.access_token, expiryMs);
        return data.access_token;
      }
      console.error('sendpulseTokenEndpoint is not configured');
      return null;
    } catch (err) {
      console.error('Error fetching token', err);
      return null;
    }
  };

  const getValidToken = async (): Promise<string | null> => {
    const { token, expiryMs } = readStoredToken();
    if (token && expiryMs && Date.now() < expiryMs) {
      return token;
    }
    return await fetchNewToken();
  };
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim()) {
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setStatus({ type: 'loading', message: 'Submitting...' });

    try {
      const token = await getValidToken();
      if (!token) {
        throw new Error('Unable to obtain SendPulse token');
      }
      
      const cfg = await getRuntimeConfig();
      const addressBookId = cfg.sendpulseAddressbookId || '363028';
      
      const response = await fetch(`https://api.sendpulse.com/addressbooks/${addressBookId}/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          emails: [formData.email]
        })
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Thank you! We\'ll notify you when we launch.' });
        setFormData({ email: '' });
      } else {
        throw new Error('Failed to submit email');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
            className="email-input"
            disabled={status.type === 'loading'}
          />
          <button
            type="submit"
            className="submit-button"
            disabled={status.type === 'loading'}
          >
            {status.type === 'loading' ? 'Submitting...' : 'Subscribe'}
          </button>
        </div>
        
        {status.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`status-message ${status.type}`}
          >
            {status.message}
          </motion.div>
        )}
      </form>
    </div>
  );
};

export default SignupForm;
```

## Key Features

### 1. Token Management
- **Automatic Token Refresh**: Tokens are cached and automatically refreshed when expired
- **Local Storage**: Tokens are stored locally to avoid unnecessary API calls
- **Error Handling**: Graceful fallback when token retrieval fails

### 2. Email Validation
- **Client-side Validation**: Real-time email format validation
- **User Feedback**: Clear error messages for invalid inputs

### 3. Security
- **Proxy Pattern**: SendPulse credentials are never exposed to the frontend
- **CORS Handling**: Proper CORS headers for cross-origin requests
- **Environment Variables**: Sensitive data stored securely in Firebase

### 4. User Experience
- **Loading States**: Visual feedback during form submission
- **Success/Error Messages**: Clear communication with users
- **Form Reset**: Automatic form clearing after successful submission

## Configuration Options

### Environment Variables
- `SENDPULSE_CLIENT_ID`: Your SendPulse client ID
- `SENDPULSE_CLIENT_SECRET`: Your SendPulse client secret

### App Configuration (`public/app-config.json`)
- `sendpulseTokenEndpoint`: URL of your Firebase Cloud Function
- `sendpulseAddressbookId`: SendPulse address book ID for storing emails

## Deployment Checklist

1. ✅ Set up SendPulse account and get API credentials
2. ✅ Create address book in SendPulse
3. ✅ Configure Firebase Cloud Function with credentials
4. ✅ Deploy Cloud Function to Firebase
5. ✅ Update `app-config.json` with function URL and address book ID
6. ✅ Test the integration with a real email address

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your Cloud Function has proper CORS headers
2. **Token Expiry**: Check that token refresh logic is working correctly
3. **Address Book ID**: Verify the address book ID is correct in SendPulse
4. **API Limits**: Monitor SendPulse API usage and rate limits

### Debug Steps

1. Check browser console for JavaScript errors
2. Verify Cloud Function logs in Firebase Console
3. Test the token endpoint directly with curl/Postman
4. Confirm SendPulse address book exists and is accessible

## Security Considerations

- Never expose SendPulse credentials in frontend code
- Use HTTPS for all API communications
- Implement rate limiting to prevent abuse
- Consider adding CAPTCHA for additional spam protection
- Monitor for unusual signup patterns

## Alternative Implementations

### Direct API Integration
If you prefer not to use Firebase Cloud Functions, you can:
1. Use SendPulse's webhook integration
2. Implement server-side API calls from your backend
3. Use SendPulse's JavaScript SDK (less secure for credentials)

### Webhook Approach
```javascript
// Alternative: Direct webhook submission
const response = await fetch('https://your-sendpulse-webhook-url', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: formData.email })
});
```

This guide provides a complete, production-ready implementation for integrating SendPulse email collection into your React application.
