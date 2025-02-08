#!/bin/bash

set -e

# if [ -d "venv" ]; then
#     source venv/bin/activate
# elif [ -d ".venv" ]; then
#     source .venv/bin/activate
# else
#     echo "No virtual environment found. Creating one..."
#     python3 -m venv venv
#     source venv/bin/activate
# fi

# pip install -r requirements.txt

uvicorn server:app --host 0.0.0.0 --port 8000 --reload
