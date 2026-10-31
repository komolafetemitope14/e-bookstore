# Raising Beyond Today — E-Bookstore

The official web storefront for **Raising Beyond Today** by **Abimbola Olamoju**.

**Raising Beyond Today: A Practical Guide to Intentional Parenting in a Digital World** explores intentional parenting through real-life experiences, reflections, and practical guidance for raising children with character, emotional resilience, sound judgement, responsibility, and independence.

## About the Project

This project is being developed as the online home and sales platform for *Raising Beyond Today*.

The website introduces the book and its key themes, tells the story of the author, and provides a foundation for customers to purchase the book online.

The project is currently under active development and testing.

## Current Features

- Responsive book landing page
- Book overview and key themes
- About the Author section
- Custom Raising Beyond Today branding
- Responsive mobile navigation
- Book purchase call-to-action
- NGN-focused storefront
- UAT deployment through GitHub Actions and GitHub Pages

## Planned Features

- Book pricing and quantity selection
- Customer checkout form
- Delivery information collection
- Paystack payment integration
- Secure server-side payment verification
- Order confirmation
- Customer payment confirmation email
- Seller order notification email
- Delivery information
- Returns and refund information
- Privacy policy
- Terms and conditions
- Production custom domain

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- ESLint
- Git
- GitHub
- GitHub Actions
- GitHub Pages

## Project Structure

```text
e-bookstore/
├── .github/
│   └── workflows/
│       └── deploy-uat.yml
├── public/
│   ├── images/
│   │   ├── abimbola-olamoju.jpeg
│   │   └── raising-beyond-today.jpeg
│   └── favicon.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
