# One Step at a Time - Habit Building App

A progressive habit-building platform that helps users develop habits based on their current capacity, following a scientifically-backed approach to habit formation.

## About the Project

"One Step at a Time" is designed to help users build lasting habits through a progressive four-phase workflow system:

1. **Baseline**: Determine your current maximum capacity for a habit
2. **Kickstart**: Start with 75% of your baseline for 5 days to build consistency
3. **Progressive Build**: Gradually increase the intensity as you get stronger
4. **Optimization**: Maintain the habit and track advanced metrics

## Tech Stack

- **Frontend**: React with TypeScript
- **UI**: Tailwind CSS with ShadCN components
- **Backend**: Supabase (Authentication, Database, Storage)
- **Hosting**: Vercel

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or bun
- Supabase account

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/steady-streak-builder.git
cd steady-streak-builder
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Create a `.env.local` file in the root directory and add your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
# or
bun dev
```

### Setting Up Supabase

1. Create a new Supabase project
2. Run the SQL migrations in `supabase/migrations` to set up the database schema
3. Configure authentication providers (Email, Google, etc.)

## Features

- **User Authentication**: Sign up, log in, and manage user accounts
- **Habit Creation**: Set up new habits with baseline measurements
- **Daily Check-ins**: Track progress with daily habit completions
- **Progress Tracking**: Visualize growth and consistency over time
- **Phase Progression**: Automatically advance through the habit-building phases

## Project Structure

```
steady-streak-builder/
├── public/          # Static assets
├── src/
│   ├── components/  # React components
│   │   └── ui/      # UI components from ShadCN
│   ├── contexts/    # Context providers
│   ├── hooks/       # Custom React hooks
│   ├── integrations/# External service integrations
│   │   └── supabase/# Supabase client and types
│   ├── lib/         # Utility libraries
│   └── pages/       # Page components
├── supabase/        # Supabase configuration and migrations
└── utils/          # Utility functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- ShadCN UI for the component library
- Supabase for the backend services
- The habit-building research community for the science behind the approach
