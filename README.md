# Raising Beyond Today — E-Bookstore

The official online bookstore for **Raising Beyond Today** by **Abimbola Olamoju**.

> **Raising Beyond Today: A Practical Guide to Intentional Parenting in a Digital World**

The book explores intentional parenting through real-life experiences, reflections, and practical guidance for raising children with character, emotional resilience, sound judgement, responsibility, and independence.

## Project Status

**Status:** Active development / UAT

The project currently has a working responsive storefront, separate E-Book and Hard Cover editions, Supabase authentication and database integration, and automated UAT deployment through GitHub Actions and GitHub Pages.

Payment processing, protected digital-book delivery, customer purchase history, physical-book checkout, transactional email, and production deployment are still under development.

The project is intentionally being tested in UAT before production release.

## Book Editions

### E-Book

- Price: **₦100**
- Currency: **NGN**
- Customer account required
- Secure digital access after verified payment
- Planned access through **My Library**
- The actual e-book file will not be stored in the public website or GitHub repository

### Hard Cover

- Price: **₦150**
- Currency: **NGN**
- Physical edition
- Customer accounts will be supported
- Signed-in customers will be able to view their purchases
- Physical checkout will collect recipient and delivery information
- Delivery information can be different from the payer/account holder
- Database architecture also supports guest physical orders

## Customer Accounts

Customer authentication is implemented with Supabase Auth.

Current account functionality includes:

- Customer sign up
- Customer sign in
- Customer sign out
- Persistent authenticated sessions
- Email-based accounts
- Minimum password requirements
- Automatic customer profile creation
- Optional profile information

E-Book accounts intentionally do not require physical delivery information.

Passwords are handled by Supabase Auth and are not stored as readable passwords by this application.

## Customer Purchase Experience

The intended customer experience is:

### E-Book Purchase

1. Customer creates an account or signs in
2. Customer selects the E-Book
3. Payment is initiated through the secure payment backend
4. Paystack payment is verified server-side
5. A successful verified payment creates an E-Book entitlement
6. The customer receives access through **My Library**
7. The customer receives a payment/access confirmation email
8. The seller receives a new-sale notification

Signing in by itself will **not** grant access to the E-Book. Access will require a verified successful purchase.

### Hard Cover Purchase

1. Customer selects the Hard Cover edition
2. Customer may use an account so purchases can be associated with their account
3. Recipient and delivery information is collected
4. Payment is initiated
5. Payment is verified server-side
6. The physical order is recorded
7. Signed-in customers will be able to view the purchase in their account
8. Customer and seller receive the appropriate order notifications

Hard Cover delivery information includes fields such as:

- Recipient first name
- Recipient last name
- Phone number
- Email address where appropriate
- Country
- State / region
- City
- Delivery address

Delivery information belongs to the physical-book recipient and does not have to be the same as the payer's account information.

## Completed

The following functionality has been implemented:

- Responsive React storefront
- Raising Beyond Today branding
- Book overview
- Key themes
- About the Author section
- Responsive navigation
- Separate E-Book and Hard Cover purchase cards
- E-Book price of ₦100
- Hard Cover price of ₦150
- NGN storefront
- Supabase project integration
- Supabase authentication
- Customer sign up
- Customer sign in
- Customer sign out
- Persistent authentication sessions
- Automatic profile creation
- Database Row Level Security foundation
- Book and edition database schema
- Order database foundation
- E-Book entitlement database foundation
- Payment-event database foundation
- Physical delivery fields
- Support for account-based and guest physical orders
- GitHub Actions UAT build pipeline
- GitHub Pages UAT deployment
- UAT Supabase environment configuration

## In Progress

Current development work includes:

- Authentication email/redirect configuration
- Customer account experience
- My Library
- My Purchases / order history
- E-Book entitlement checks
- Hard Cover checkout
- Recipient and delivery form
- Secure backend/API layer
- Paystack Test Mode integration
- Server-side payment verification
- Protected E-Book delivery
- Transactional email notifications

## Planned

Planned production functionality includes:

- Private E-Book object storage
- Short-lived authorized E-Book access
- Customer payment confirmation emails
- Customer digital-access emails
- Seller new-sale notifications
- Hard Cover order notifications
- Payment webhook verification
- Rate limiting
- Bot protection where appropriate
- Security headers
- Content Security Policy where hosting permits
- Logging and monitoring
- Backup procedures
- Secret-rotation procedures
- Returns and refund information
- Privacy policy
- Terms and conditions
- Production custom domain
- Production Paystack activation
- Final production security review

## Security Architecture

Security is a core requirement of the project.

The architecture is designed around the following principles:

- No Paystack secret key in the React frontend
- No Supabase service-role key in the React frontend
- No secret credentials committed to Git
- Supabase Row Level Security on exposed database tables
- Server-side payment initialization and verification
- Server-controlled product pricing
- Verified payment required before granting digital access
- Payment webhook validation
- Private E-Book storage
- Short-lived authorized access to digital content
- Restrictive backend CORS configuration
- Input validation
- Rate limiting for sensitive endpoints
- Least-privilege access
- HTTPS
- Dependency and security maintenance

The actual E-Book must **never** be committed to the GitHub repository or placed in the website's public assets.

## Payment Architecture

Payments will be processed through **Paystack**.

Development and UAT will use Paystack Test Mode before any live payment processing is enabled.

Current product amounts are:

| Edition | Price | Payment Amount |
| --- | ---: | ---: |
| E-Book | ₦100 | 10,000 kobo |
| Hard Cover | ₦150 | 15,000 kobo |

The browser will not be trusted to determine the final payable amount.

The secure backend will determine the product price and verify the transaction before an order is marked as paid or an E-Book entitlement is granted.

## Digital Book Protection

The E-Book will not be hosted directly on GitHub Pages.

The planned architecture uses private object storage for the digital book.

Before access is granted, the backend will verify:

1. The customer is authenticated
2. The customer has a valid E-Book entitlement
3. The entitlement came from a verified successful payment

The backend can then provide short-lived authorized access to the private book.

This approach reduces unauthorized sharing, although no web-based system can guarantee that digital content can never be copied.

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Custom CSS
- ESLint

### Authentication and Database

- Supabase Auth
- Supabase PostgreSQL
- Supabase Row Level Security

### Payments

- Paystack
- Paystack Test Mode during UAT

### Planned Secure Backend and Storage

- Serverless/API backend
- Private object storage for the E-Book
- Short-lived authorized digital access

### Development and Deployment

- Git
- GitHub
- GitHub Actions
- GitHub Pages

## Database Foundation

The database currently includes:

- `profiles`
- `books`
- `book_editions`
- `orders`
- `entitlements`
- `payment_events`

Database migrations are maintained in:

```text
supabase/migrations/
```

The schema supports both authenticated digital customers and physical-book orders.

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
│   ├── components/
│   │   └── AuthModal.tsx
│   ├── lib/
│   │   └── supabase.ts
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── supabase/
│   └── migrations/
│       ├── 001_initial_schema.sql
│       ├── 002_add_book_editions.sql
│       └── 003_support_minimal_accounts_and_guest_orders.sql
├── .env.example
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

## Environment Configuration

Local development uses environment variables such as:

```text
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

The local `.env.local` file is excluded from Git.

The UAT GitHub Actions build receives the required frontend configuration through GitHub Actions repository variables.

Sensitive server-side credentials must never use the `VITE_` prefix because Vite variables are exposed to the browser application.

## UAT

The project uses the `uat` branch for unfinished integration and acceptance testing.

The UAT deployment is automated through GitHub Actions and GitHub Pages.

Changes should be tested locally, inspected, committed, pushed to `uat`, and verified on the deployed UAT website before production release.

## Development Workflow

The project follows this general workflow:

```text
Concept
  ↓
Requirement
  ↓
Implementation
  ↓
Local Test
  ↓
Code Inspection
  ↓
Commit
  ↓
Push to UAT
  ↓
UAT Verification
  ↓
Production Release
```

## Current Roadmap

The next major milestones are:

1. Complete authentication redirect/email configuration
2. Build customer account navigation
3. Build My Library
4. Connect E-Book entitlements to My Library
5. Build My Purchases / order history
6. Build Hard Cover recipient and delivery checkout
7. Implement the secure backend/API
8. Integrate Paystack Test Mode
9. Implement server-side payment verification
10. Implement private E-Book storage and authorized access
11. Implement customer and seller transactional emails
12. Perform security hardening and UAT
13. Add legal/customer-service pages
14. Configure the production domain
15. Production release

## Author

**Abimbola Olamoju**

Author of *Raising Beyond Today: A Practical Guide to Intentional Parenting in a Digital World*.

## Development Status

This repository is an active software project.

Features documented as **planned** or **in progress** should not be interpreted as production-complete until they have passed UAT and have been released to production.
