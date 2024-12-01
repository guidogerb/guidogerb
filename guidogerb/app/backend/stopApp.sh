#!/bin/bash

echo "Stopping running processes..."
# Kill frontend processes
pkill -f "node"
# Kill backend processes
pkill -f "java.*demo"
