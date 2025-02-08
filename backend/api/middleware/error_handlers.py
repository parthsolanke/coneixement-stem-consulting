from fastapi import Request
from fastapi.responses import JSONResponse
import asyncio

async def event_loop_error_handler(request: Request, call_next):
    try:
        try:
            loop = asyncio.get_running_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            
        return await call_next(request)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "detail": str(e),
                "message": "Internal server error occurred"
            }
        )