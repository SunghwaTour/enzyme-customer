# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) application for "효소방" (Enzyme Room) - a 24-hour unmanned enzyme bath spa reservation system. The application supports both customer-facing booking flows and kiosk mode for on-site check-in.

**Tech Stack:**
- Next.js 16 with App Router (React 19)
- TypeScript 5
- Tailwind CSS v4 with shadcn/ui components
- Client-side localStorage for data persistence (development/demo mode)
- PortOne (formerly Iamport) for payment integration
- Vercel Analytics

## Development Commands

```bash
# Start development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Architecture

### Data Layer (lib/storage.ts)

The application uses **browser localStorage** as a data persistence layer. This is a temporary development/demo setup and should be replaced with a real database in production.

**Storage structure:**
- `users` - User accounts with email/password authentication
- `rooms` - Available enzyme bath rooms (4 rooms initialized by default)
- `bookings` - Reservation records with customer info and status tracking
- `payments` - Payment records linked to bookings
- `currentUser` - Session management
- `passwords` - Password storage (temporary, development only)

**Key storage patterns:**
- All storage functions call `initializeStorage()` to ensure defaults exist
- Server Actions use `"use server"` but still access localStorage (limitation of current setup)
- Data models are defined as TypeScript interfaces at the top of lib/storage.ts

### Route Structure

**Customer flows:**
- `/` - Landing page with benefits, pricing, and how-it-works sections
- `/booking` - Multi-step booking form (duration → date/time → customer info → payment)
- `/booking/confirmation` - Post-booking confirmation page
- `/auth/login` - Customer login
- `/auth/sign-up` - Customer registration
- `/auth/sign-up-success` - Post-registration success page
- `/dashboard` - Customer dashboard to view their bookings

**Kiosk flow:**
- `/kiosk` - Full self-service kiosk interface with step-based wizard (welcome → duration → datetime → info → payment → complete)

**Admin flows:**
- `/admin` - Admin dashboard overview
- `/admin/bookings` - Manage all bookings
- `/admin/rooms` - Manage room availability
- `/admin/payments` - View payment records

### Server Actions (app/actions/)

**bookings.ts:**
- `createBooking()` - Creates booking + payment record atomically, with rollback on payment failure
- `getAvailableRooms()` - Checks room availability for specific date/time slot

**payments.ts:**
- `verifyPortOnePayment()` - Server-side payment verification (TODO: add actual PortOne API integration)
- `processPayment()` - Completes payment and updates booking status to "confirmed"
- `cancelPayment()` - Refunds payment and cancels booking

**Important:** These Server Actions currently use localStorage which only works client-side. In production, replace with database queries.

### UI Components

Uses **shadcn/ui** (New York style) with components in `components/ui/`:
- Configured with neutral base color and CSS variables
- Icons from lucide-react
- Path alias: `@/components/ui`

Common components: Button, Card, Calendar, Input, Label, RadioGroup, Table, Badge

### Payment Integration

**PortOne (Iamport) setup:**
- Script loaded in `app/layout.tsx` via `<Script src="https://cdn.iamport.kr/v1/iamport.js">`
- Merchant ID: Set via `NEXT_PUBLIC_PORTONE_MERCHANT_ID` environment variable
- Payment methods: Card (html5_inicis PG) and Mobile (danal_tpay PG)
- Payment flow: Client initiates → PortOne handles → Server verifies → Update booking status

**Type definitions:** `lib/types/portone.d.ts` extends Window interface for IMP global

### Authentication

Simple email/password authentication stored in localStorage:
- `auth.signUp()` - Creates user and sets currentUser
- `auth.signIn()` - Validates credentials and sets currentUser
- `auth.signOut()` - Clears currentUser
- `auth.getUser()` - Retrieves current session

**Security note:** This is demo-level auth. Implement proper authentication (NextAuth, Supabase Auth, etc.) for production.

## Key Business Logic

**Booking flow:**
1. Customer selects duration (30/60/90 min), date, time slot, and enters contact info
2. `createBooking()` atomically creates both booking and payment records
3. Client-side payment modal (PortOne) collects payment
4. `processPayment()` verifies and completes the transaction
5. Booking status changes: pending → confirmed → completed (or cancelled/refunded)

**Room availability:**
- 4 rooms initialized by default (Room 1-4)
- `getAvailableRooms()` filters out rooms with pending/confirmed bookings for the requested time slot
- Room status: available | occupied | maintenance

**Pricing:**
- 30 minutes: ₩25,000
- 60 minutes: ₩40,000 (most popular)
- 90 minutes: ₩55,000

## Known Limitations & TODOs

1. **localStorage is not a real database** - Replace with PostgreSQL/Supabase/etc.
2. **Server Actions access localStorage** - This only works because Next.js bundles them for client-side execution. Proper server actions need database access.
3. **PortOne payment verification is stubbed** - Implement actual API verification in `verifyPortOnePayment()`
4. **No authentication on admin routes** - Add proper auth middleware/protection
5. **No environment variable for PortOne merchant ID** - Set `NEXT_PUBLIC_PORTONE_MERCHANT_ID` in production

## Code Patterns

**Form handling:**
- Use React state for form fields
- Server Actions for data mutations
- `useRouter()` for navigation after success
- `useToast()` hook from shadcn/ui for user feedback

**Type safety:**
- Interfaces defined in lib/storage.ts (User, Room, Booking, Payment)
- TypeScript strict mode enabled
- Path aliases configured: `@/*` → `./`

**Styling:**
- Tailwind CSS v4 with @tailwindcss/postcss
- Korean language primary (lang="ko" in html)
- Responsive design with mobile-first approach
- Kiosk mode uses larger touch targets (h-16, text-2xl, etc.)

## Testing in Development

Since data is in localStorage:
- Open DevTools → Application → Local Storage to inspect/modify data
- Clear localStorage to reset to defaults
- No database migrations or seeding needed
