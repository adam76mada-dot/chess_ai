#!/usr/bin/env python3
"""Simple HTTP server with proper MIME types for WASM."""
import http.server
import sys

class WASMHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.wasm': 'application/wasm',
        '.js': 'application/javascript',
    }

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 18790
print(f"Serving on http://localhost:{port}")
http.server.HTTPServer(('', port), WASMHandler).serve_forever()
