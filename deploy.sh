#!/bin/bash
set -e

# De Fabriek - Forge deployment script
# Draait in de project root na git pull

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building frontend..."
npm run build

echo "♻️  Restarting API daemon..."
sudo supervisorctl restart de-fabriek-api 2>/dev/null || echo "⚠️  Daemon restart skipped (check name in Forge)"

echo "✅ Deployment complete"
