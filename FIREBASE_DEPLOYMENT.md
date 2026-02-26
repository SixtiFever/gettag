# Firebase Functions Deployment Guide

## Overview

This guide will help you deploy Firebase Functions to handle SendPulse integration and overcome CORS issues.

## Prerequisites

- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created
- SendPulse account with API credentials

## Step 1: Set Environment Variables

Set your SendPulse credentials in Firebase:

```bash
# Set SendPulse credentials
firebase functions:config:set sendpulse.client_id="131a781e29b893a2e94ec0f1806e6df1"
firebase functions:config:set sendpulse.client_secret="ad2c6a3021dcc9c694ad7088a6a655ba"
firebase functions:config:set sendpulse.addressbook_id="445976"
```

## Step 2: Deploy Functions

```bash
# Build and deploy functions
firebase deploy --only functions
```

## Step 3: Update Configuration

After deployment, update your `public/app-config.json` with your actual Firebase project ID:

```json
{
  "sendpulseTokenEndpoint": "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/getSendPulseToken",
  "sendpulseAddressbookId": "445976"
}
```

And update `src/App.tsx` with your actual function URL:

```typescript
const response = await fetch('https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/submitEmail', {
  // ... rest of the code
});
```

## Step 4: Test the Integration

1. Start your React app: `npm run dev`
2. Test the signup form
3. Check Firebase Functions logs: `firebase functions:log`

## Available Functions

### `getSendPulseToken`
- **URL**: `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/getSendPulseToken`
- **Method**: POST
- **Purpose**: Gets SendPulse access token
- **Response**: `{ access_token: "...", expires_in: 3600 }`

### `submitEmail`
- **URL**: `https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/submitEmail`
- **Method**: POST
- **Body**: `{ email: "user@example.com" }`
- **Purpose**: Submits email to SendPulse
- **Response**: `{ success: true, message: "Email submitted successfully" }`

## Troubleshooting

### Common Issues

1. **"SendPulse credentials not configured"**
   - Check environment variables: `firebase functions:config:get`
   - Redeploy after setting config: `firebase deploy --only functions`

2. **"Function not found"**
   - Check function URL is correct
   - Verify deployment succeeded: `firebase functions:list`

3. **CORS errors**
   - Functions include CORS headers
   - Check function logs: `firebase functions:log`

### Debug Steps

1. Check function logs: `firebase functions:log`
2. Test functions directly with curl:
   ```bash
   curl -X POST https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/submitEmail \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```
3. Verify environment variables: `firebase functions:config:get`

## Security Notes

- Environment variables are secure in Firebase Functions
- No credentials exposed to frontend
- CORS issues resolved by using Firebase Functions
- Rate limiting handled by Firebase

## Cost Considerations

- Firebase Functions have a free tier
- Pay per invocation after free tier
- Consider caching tokens to reduce API calls
