# FlowHub - Rewards Platform

A modern React-based rewards platform that recreates the FlowHub rewards system, allowing users to earn points through daily check-ins, referrals, and other activities, then redeem them for various rewards.

## 🚀 Features

- **User Authentication** - Secure signup/login with Supabase Auth
- **Points System** - Earn points through daily check-ins and referrals
- **Rewards Catalog** - Browse and redeem various rewards (gift cards, PayPal, etc.)
- **Responsive Design** - Mobile-first design with modern UI components
- **Real-time Updates** - Live point balance and streak tracking

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Auth + Database)
- **State Management**: React Context API
- **Routing**: React Router DOM

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account and project

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Emmy2gud/flowhub.git
cd flowhub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_KEY=your_supabase_anon_key
```

### 4. Supabase Database Setup

Create the following tables in your Supabase project:

#### `profiles` table:
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  points INTEGER DEFAULT 25,
  daily_streak INTEGER DEFAULT 1,
  last_daily_claim DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```


```

### 5. Enable Row Level Security (RLS)

Enable RLS on both tables and create policies:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Rewards policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view rewards" ON rewards FOR SELECT TO authenticated USING (true);
```

### 6. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`
3. Deploy



## 📱 Usage

1. **Sign Up/Login** - Create an account or sign in
2. **Earn Points** - Check in daily, share referral links, complete activities
3. **Redeem Rewards** - Browse available rewards and redeem when you have enough points
4. **Track Progress** - Monitor your points balance and daily streak

## 🤝 Assumptions & Trade-offs

### Assumptions Made:
- Users will have stable internet connection for Supabase operations
- Supabase project is properly configured with required tables
- Reward redemption will be handled manually by administrators
- Points system is purely for UI demonstration (no actual monetary transactions)

### Trade-offs:
- **Hardcoded reward data initially** - Moved to database for better maintainability
- **Client-side validation only** - Relies on Supabase's built-in validation
- **No real-time subscriptions** - Uses simple fetch/update pattern for simplicity
- **Limited error handling** - Basic error states implemented, could be expanded

## 📄 License

This project is created for the React Full-Stack Developer assessment and is not intended for production use without further development.

## 👨‍💻 Author

Emma - React Full-Stack Developer Assessment Submission

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
