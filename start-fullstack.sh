#!/bin/bash

# Quick Start Script for Balkar Clipper Full Stack
# Runs both backend (Python) and frontend (Next.js)

echo "🚀 Starting Balkar Clipper Full Stack..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if backend directory exists
if [ ! -d "../balkar-clipper-python" ]; then
    echo "❌ Backend directory not found!"
    echo "Expected: ../balkar-clipper-python"
    exit 1
fi

# Start Backend
echo "${BLUE}📡 Starting Backend (Python FastAPI)...${NC}"
cd ../balkar-clipper-python

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv and start backend in background
source venv/bin/activate
pip install -q -r requirements.txt

echo "${GREEN}✅ Backend starting at http://localhost:8000${NC}"
python -m uvicorn app.main:app --reload --port 8000 &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to be ready..."
sleep 3

# Go back to frontend
cd - > /dev/null

# Start Frontend
echo ""
echo "${BLUE}🎨 Starting Frontend (Next.js)...${NC}"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

echo "${GREEN}✅ Frontend starting at http://localhost:3000${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Both servers are running!"
echo ""
echo "📡 Backend:  http://localhost:8000"
echo "   API Docs: http://localhost:8000/docs"
echo ""
echo "🎨 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Trap Ctrl+C and kill backend
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID 2>/dev/null; exit" INT

# Start frontend (this will run in foreground)
npm run dev
