from fastapi import FastAPI
from fastapi.responses import JSONResponse
from api.report.report_utils import generate_report, validate_report
from api.utils.models import ReportRequest, ReportResponse

app = FastAPI(root_path="/api/report")

@app.post("/", response_model=ReportResponse)
async def get_report(request: ReportRequest):
    try:
        report_data = await generate_report(
            request.scores,
            request.strengths,
            request.weaknesses
        )
        valid, message = validate_report(report_data)
        if not valid:
            return JSONResponse(
                status_code=400,
                content={"detail": message, "data": report_data}
            )
        return report_data
    except Exception as e:
        print(f"Error in report generation endpoint: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"detail": str(e)}
        )

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Career Guidance Report API!"}