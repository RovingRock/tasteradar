from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="TasteRadar API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "TasteRadar API", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)
@app.route('/innovation-lab')
def innovation_lab():
    # Read the file and serve it directly without base template
    import os
    file_path = os.path.join(app.root_path, 'templates', 'innovation_lab.html')
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    from flask import make_response
    response = make_response(content)
    response.headers['Content-Type'] = 'text/html; charset=utf-8'
    return response
from fastapi.responses import FileResponse

@app.get("/innovation-lab")
async def innovation_lab():
    return FileResponse('static/innovation_lab.html')
