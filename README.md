# SmartTutor

Welcome to SmartTutor, a data-driven platform designed to bring transparency to the private tutoring market. This repository contains the full monorepo for the project, including the frontend application, the backend API, and the database schema.

## Project Structure

- **/frontend**: A Next.js application that serves as the user interface.
- **/backend**: A FastAPI (Python) application that provides the core API and business logic.
- **/supabase**: Contains the PostgreSQL database migrations managed by the Supabase CLI.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later) and [pnpm](https://pnpm.io/)
- [Python](https://www.python.org/) (v3.9 or later) and [pip](https://pip.pypa.io/en/stable/installation/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- A Supabase project (create one at [supabase.com](https://supabase.com/dashboard))

### 1. Backend Setup

First, set up and run the FastAPI backend.

```bash
# Navigate to the backend directory
cd backend

# Create a virtual environment using uv
uv venv

source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install Python dependencies using uv
uv pip install -r requirements.txt

# Create a .env file for backend secrets
# Copy your Supabase connection string from the dashboard
echo "DATABASE_URL=your_supabase_connection_string" > .env
echo "SUPABASE_JWT_SECRET=your_supabase_jwt_secret" >> .env

# Run the backend server
uvicorn main:app --reload
```

The backend API should now be running on `http://localhost:8000`.

### 2. Frontend Setup

In a new terminal, set up and run the Next.js frontend.

```bash
# Navigate to the frontend directory
cd frontend

# Install Node.js dependencies
pnpm install

# Create a .env.local file for frontend secrets
# Copy these values from your Supabase project's API settings
echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url" > .env.local
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key" >> .env.local

# Run the frontend development server
pnpm run dev
```

The frontend application should now be running on `http://localhost:3000`.

### 3. Database Setup (Only on Initial Setup)

If you are setting up the project for the first time, you need to apply the database migrations.

```bash
# Make sure you have logged in to the Supabase CLI
supabase login

# Link your project (replace with your project ref)
supabase link --project-ref your_project_ref

# Apply the database migrations
supabase db push
```

---

## Testing

This project is configured with a full suite of tests.

### Backend Testing

```bash
# Navigate to the backend directory
cd backend

# Activate your virtual environment
source venv/bin/activate

# Run tests (you may need to install pytest first: uv pip install pytest)
pytest
```

### Frontend Testing

```bash
# Navigate to the frontend directory
cd frontend

# Run linting checks
pnpm run lint

# Run the Next.js build command to check for errors
pnpm run build
```
