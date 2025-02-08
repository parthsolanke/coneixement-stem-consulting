from fastapi import Request
from fastapi.responses import JSONResponse
import asyncio

async def event_loop_error_handler(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except RuntimeError as e:
        if "Event loop is closed" in str(e):
            try:
                loop = asyncio.get_running_loop()
            except RuntimeError:
                loop = asyncio.new_event_loop()
                asyncio.set_event_loop(loop)
            return JSONResponse(
                status_code=500,
                content={"detail": "Internal server error. Please try again."}
            )
        raise