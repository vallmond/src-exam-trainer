#!/usr/bin/env python3
"""
Simple HTTP server to serve the exam web application.
"""
import http.server
import socketserver
import os

# Set the port
PORT = 8000

# Change to the directory containing the files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create the HTTP server
Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("", PORT), Handler)

print(f"Serving at http://localhost:{PORT}")
print("Press Ctrl+C to stop the server")

# Start the server
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    httpd.server_close()
