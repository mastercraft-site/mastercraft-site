/*
 * MasterCraft site config — the ONE file to edit for day-to-day changes.
 * Edit a value below, save, commit, push to GitHub Pages. That's it.
 * Every place this data appears on the site (header, hero, footer, schema, etc.)
 * updates automatically — no need to touch index.html, styles.css, or app.js.
 */
window.SITE_CONFIG = {
  business: {
    name: "MasterCraft Auto Repair & Collision",
    shortName: "MasterCraft",
    tagline: "Auto Repair & Collision",
    phoneDisplay: "(718) 578-4563",
    phoneHref: "tel:+17185784563",
    phoneE164: "+1-718-578-4563",   // used only in the SEO schema
    email: "shop@mastercraftautony.com",
    mailtoHref: "mailto:shop@mastercraftautony.com",
    website: "https://www.mastercraftautony.com",
    websiteDisplay: "www.mastercraftautony.com"
  },

  address: {
    street: "38-21 23rd Street",
    cityStateZip: "Long Island City, NY 11101",
    full: "38-21 23rd Street, Long Island City, NY 11101",
    city: "Long Island City",   // used only in the SEO schema
    region: "NY",               // used only in the SEO schema
    zip: "11101",               // used only in the SEO schema
    country: "US"               // used only in the SEO schema
  },

  hours: {
    badge: "Open Daily 6AM–Midnight",
    days: "Monday–Sunday",
    range: "6AM – 12AM (Midnight)",
    // used only in the SEO schema — keep in sync with the lines above
    schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    schemaOpens: "06:00",
    schemaCloses: "24:00"
  },

  images: {
    logo: "images/logo-badge.png",
    hero: "images/hero-storefront.png",
    aboutShop: "images/shop-sign-hires.png",
    mapBackground: "images/image-1783132135535.webp"
  },

  social: {
    facebook: "https://www.facebook.com/mastercraftautony",
    youtube: "https://www.youtube.com/@mastercraftautony",
    tiktok: "https://www.tiktok.com/@mastercraftautony"
  },

  map: {
    // Google Maps "get directions" deep link — opens the native app on mobile
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=38-21+23rd+Street%2C+Long+Island+City%2C+NY+11101"
  }
};
