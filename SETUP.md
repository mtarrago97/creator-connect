# Auctio — Creator-Fan Auction Marketplace Setup Guide

## Overview
Auctio is a complete auction marketplace where creators can sell exclusive objects and experiences to their fans. Built with React, TypeScript, Supabase, and Apple-inspired design principles.

## Features Implemented

### Core Functionality
- **Auction Detail Pages** - Full auction view with images, bidding, and creator information
- **Search & Discovery** - Advanced search with category filters and sorting options
- **Bidding System** - Real-time bidding with bid history and notifications
- **Payment Flow** - Secure checkout process with order summary
- **User Authentication** - Sign up, sign in, and session management
- **User Dashboard** - Track active bids and watchlist
- **Watchlist** - Save favorite auctions for later

### Design
- Apple-inspired clean, minimal design
- Refined Creator Spotlight section matching overall aesthetic
- Responsive layout for mobile, tablet, and desktop
- Smooth animations and transitions
- Professional color scheme without purple/violet tones

### Backend
- Supabase database with complete schema
- Row Level Security (RLS) policies for data protection
- Tables for auctions, bids, payments, profiles, watchlist
- Real-time updates support

## Database Schema

### Tables
1. **profiles** - User profiles with creator verification
2. **categories** - Auction categories (Fashion, Art, Music, etc.)
3. **auctions** - Auction listings with metadata
4. **bids** - Bid history and tracking
5. **watchlist** - User's saved auctions
6. **payments** - Payment transactions
7. **search_history** - User search queries

## Setup Instructions

### 1. Environment Setup

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Supabase Configuration

The database migrations have already been applied. Your Supabase instance should have:
- All tables created with proper relationships
- RLS policies enabled and configured
- Default categories populated

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:8080`

### 5. Build for Production

```bash
npm run build
```

## User Journeys

### Fan Journey (Buyer)

1. **Discovery**
   - Land on homepage
   - Browse featured auctions by category
   - Use search with filters (category, price, ending soon)

2. **Auction Detail**
   - View high-quality images
   - Read full description
   - See creator profile and verification
   - Check current bid and time remaining
   - Add to watchlist

3. **Bidding**
   - Sign in/Sign up (required)
   - Place bid with validation
   - Receive outbid notifications
   - Track bids in dashboard

4. **Winning & Payment**
   - Win auction notification
   - Proceed to secure checkout
   - Enter payment details
   - Add shipping address
   - Complete payment

5. **Post-Purchase**
   - Receive confirmation
   - Track order status
   - Rate experience

### Creator Journey (Seller)

1. **Sign Up**
   - Create account
   - Get verified as creator
   - Set up profile

2. **List Auction**
   - Upload item images
   - Write description
   - Set starting bid and duration
   - Choose category
   - Publish auction

3. **Manage Auctions**
   - Monitor bids
   - Answer questions
   - Update listing

4. **After Sale**
   - Receive payment
   - Ship item
   - Get buyer feedback

## Key Pages

### `/` - Homepage
- Hero section with featured auctions
- Live auctions section
- Experiences showcase
- Objects by category
- Creator spotlight
- How it works
- Trust & safety information

### `/search` - Search & Browse
- Full-text search
- Category filters
- Sort options (ending soon, newly listed, price)
- Grid view of results

### `/auction/:id` - Auction Detail
- Image gallery
- Full description
- Creator profile card
- Bidding interface
- Countdown timer
- Watch/favorite button
- Related auctions

### `/auth` - Authentication
- Sign in form
- Sign up form
- Password recovery

### `/dashboard` - User Dashboard
- My bids tab
- Watchlist tab
- Account settings
- Bid history

### `/checkout/:id` - Payment
- Order summary
- Payment method selection
- Shipping address
- Secure checkout

## Technical Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: React Context + Hooks
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner toast library

## Design Principles

Following Apple's design language:
- Clean, minimal interface
- Generous white space
- Large, readable typography
- Subtle animations
- Clear visual hierarchy
- Consistent spacing system
- Professional, neutral color palette
- High-quality imagery

## Security Features

- Row Level Security (RLS) on all tables
- Authenticated-only bidding
- Secure payment processing
- Data validation on forms
- Protected API routes
- Escrow payment system

## Best Practices Implemented

- TypeScript for type safety
- Component composition
- Custom hooks for reusable logic
- Optimistic UI updates
- Error boundaries
- Loading states
- Responsive design
- Accessibility (ARIA labels, keyboard navigation)
- SEO-friendly meta tags

## Next Steps

To enhance the platform:
1. Add real-time bid updates using Supabase subscriptions
2. Implement push notifications
3. Add creator analytics dashboard
4. Build messaging system for buyer-seller communication
5. Add payment processor integration (Stripe)
6. Implement auction recommendations
7. Add social sharing features
8. Build mobile apps (React Native)

## Support

For questions or issues, refer to:
- Supabase Documentation: https://supabase.com/docs
- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com/docs

## License

Proprietary - Auctio Platform
