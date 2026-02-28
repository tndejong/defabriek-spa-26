#!/bin/bash
set -e

# De Fabriek - Forge deployment script
# Draait in $FORGE_RELEASE_DIRECTORY (zero-downtime deployments)
# Daemon restart gebeurt in het hoofdscript na $ACTIVATE_RELEASE()

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building frontend..."
npm run build

echo "✅ Build complete"
