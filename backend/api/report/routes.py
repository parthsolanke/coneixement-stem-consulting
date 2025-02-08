from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from report.report_utils import generate_report, validate_report
from utils.models import ReportRequest, ReportResponse
import asyncio
import logging

logger = logging.getLogger(__name__)

app = FastAPI(root_path="/api/report")

@app.post("/", response_model=ReportResponse)
async def get_report(request: ReportRequest):
    try:
        try:
            loop = asyncio.get_running_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        
        report_data = await generate_report(
            request.scores,
            request.strengths,
            request.weaknesses
        )
        
        valid, message = validate_report(report_data)
        if not valid:
            raise HTTPException(status_code=400, detail=message)
            
        return report_data
        
    except Exception as e:
        error_msg = f"Error in report generation: {str(e)}"
        logger.error(error_msg)
        return JSONResponse(
            status_code=500,
            content={"detail": error_msg}
        )

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Career Guidance Report API!"}