# Supabase Setup for One Step at a Time

This directory contains SQL migrations and configurations for setting up the Supabase backend for the One Step at a Time habit-building application.

## Database Setup

### Running Migrations

1. Log in to your Supabase dashboard and select your project
2. Navigate to the "SQL Editor" section
3. Copy the contents of the migration file from `migrations/20240801000000_init.sql`
4. Paste the SQL into the SQL Editor
5. Click "Run" to execute the SQL and set up your database

### Schema Verification

After running the migrations, you should have the following tables:

- `habits` - Stores habit data
- `check_ins` - Stores daily check-ins for habits
- `user_profiles` - Stores user profile information

## Authentication Setup

1. In your Supabase dashboard, navigate to "Authentication" > "Settings"
2. Under "Email Auth", enable Email Confirmations if desired
3. Under "External OAuth Providers", configure Google authentication:
   - Create a Google OAuth app in the Google Cloud Console
   - Add the Client ID and Secret to Supabase
   - Configure the redirect URL as `https://your-app-url.com/auth/callback`

## Row Level Security

The migrations automatically set up Row Level Security (RLS) policies to ensure users can only access their own data. The policies include:

- Habits: Users can only view, create, update, and delete their own habits
- Check-ins: Users can only view, create, update, and delete their own check-ins
- User profiles: Users can only view and update their own profile

## User Triggers

A trigger is set up to automatically create a user profile record when a new user signs up. 