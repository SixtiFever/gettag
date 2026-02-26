# Tag App Landing Page

A modern, video-background landing page for the Tag app beta launch. Built with React, TypeScript, and Vite.

## Features

- **Video Background**: Full-screen video background with overlay
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Beta Signup Form**: Clean form for collecting beta user information
- **Style Guide Compliance**: Follows the Tag app design system
- **Modern UI**: Clean, minimalistic design with smooth animations

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Adding Your Video

1. Replace `/public/placeholder-video.mp4` with your actual video file
2. Ensure the video is optimized for web (H.264 codec, compressed)
3. Recommended resolution: 1920x1080 or 1280x720

### Customization

The landing page follows the Tag app style guide with:
- **Colors**: 60:30:10 color rule (off-white, grays, dark accent)
- **Typography**: Consistent font hierarchy and spacing
- **Components**: Styled buttons, inputs, and cards
- **Responsive**: Mobile-first design approach

### Form Integration

The signup form currently logs to console. To integrate with your backend:

1. Update the `handleSubmit` function in `src/App.tsx`
2. Add your API endpoint
3. Implement proper error handling and validation

### Deployment

Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Design System

This landing page implements the Tag app style guide with:
- Gentle off-white backgrounds (#FEFEFE)
- Dark accent colors (#030301)
- Mint green highlights (#7DE2D1)
- Consistent spacing and typography
- Community-focused messaging

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)