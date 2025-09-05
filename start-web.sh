#!/bin/bash

# Hotel Reservation System - Web Interface Launcher

echo "🏨 Hotel Reservation System - Web Interface"
echo "==========================================="

# Check if Python is available
if command -v python3 &> /dev/null; then
    echo "Starting web server with Python..."
    echo "📱 Opening http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Try to open browser automatically
    if command -v open &> /dev/null; then
        open http://localhost:8000 2>/dev/null &
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000 2>/dev/null &
    fi
    
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Starting web server with Python 2..."
    echo "📱 Opening http://localhost:8000"
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Try to open browser automatically
    if command -v open &> /dev/null; then
        open http://localhost:8000 2>/dev/null &
    elif command -v xdg-open &> /dev/null; then
        xdg-open http://localhost:8000 2>/dev/null &
    fi
    
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python not found. You can still open index.html directly in your browser."
    echo "📂 Double-click on index.html or drag it to your browser window."
    
    # Try to open the HTML file directly
    if command -v open &> /dev/null; then
        echo "🚀 Attempting to open index.html in your default browser..."
        open index.html
    elif command -v xdg-open &> /dev/null; then
        echo "🚀 Attempting to open index.html in your default browser..."
        xdg-open index.html
    fi
fi