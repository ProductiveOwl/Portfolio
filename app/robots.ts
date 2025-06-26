export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',     // Applies to all web crawlers
        allow: '/',         // Allow access to everything
      },
    ],
  }
}