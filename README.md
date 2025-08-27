# LS Retail Cookie Banner

Enhanced GDPR-compliant cookie consent banner with HubSpot integration, accessible sliders, and comprehensive state management.

## 🚀 Quick Deploy

Simply include this script in your HTML:

```html
<script src="ls-retail-cookie-banner.min.js"></script>
```

Or paste directly into browser console for testing.

## ✨ Features

- **Accessible Sliders**: Full keyboard & screen reader support with smooth animations
- **Touch Support**: Mobile-optimized with swipe gestures  
- **State Persistence**: LocalStorage with 365-day expiration
- **HubSpot Integration**: Seamless privacy API integration
- **Loading States**: Professional async operation indicators
- **Toast Notifications**: User-friendly action feedback
- **4 Cookie Categories**: Essential, Functional, Analytics, Marketing
- **Responsive Design**: Works on all devices

## 📦 Installation

### Option 1: Direct Include
```html
<script src="https://your-cdn.com/ls-retail-cookie-banner.min.js"></script>
```

### Option 2: NPM (if published)
```bash
npm install ls-retail-cookie-banner
```

### Option 3: Copy & Paste
Copy the entire `ls-retail-cookie-banner.min.js` file and include in your project.

## 🔧 API Reference

```javascript
// Show the banner manually
window.LSRetailCookies.showBanner();

// Hide the banner
window.LSRetailCookies.hideBanner();

// Get current consent state
const state = window.LSRetailCookies.getConsentState();

// Set consent state programmatically
window.LSRetailCookies.setConsentState({
    functional: true,
    analytics: false,
    marketing: true
});

// Reset all consent (for testing)
window.LSRetailCookies.resetConsent();

// Accept all cookies
window.LSRetailCookies.acceptAll();

// Reject all optional cookies
window.LSRetailCookies.rejectAll();
```

## 🔌 Integrations

### HubSpot
Automatically integrates with HubSpot's privacy API when detected.

### Google Analytics
```javascript
// Automatically updates gtag consent when present
gtag('consent', 'update', {
    'analytics_storage': 'granted/denied'
});
```

### Facebook Pixel
```javascript
// Automatically updates Facebook consent when present
fbq('consent', 'grant/revoke');
```

## 🎨 Customization

The banner uses LS Retail's brand colors:
- Primary: `#361d5c` (Deep Purple)
- Secondary: `#4a2870` (Purple)
- Accent: `#f6c370` (Gold)

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Support

For issues or questions, please contact the LS Retail development team.