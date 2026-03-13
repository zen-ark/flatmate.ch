#!/bin/bash
# vibe-sync.sh: The safe way to sync vibes without overrides.

# 1. Pull the latest state
echo "🔄 Syncing with the cloud..."
git pull --rebase origin main

# 2. Check for locks in MEMORY.md
if grep -q "🔒 Active Locks" MEMORY.md; then
    echo "⚠️  WARNING: Active locks detected in MEMORY.md. Check who is vibing!"
fi

# 3. Success
echo "✅ You are synced. Ready to vibe."
