from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import base64
from io import BytesIO
from PIL import Image
import clip_images
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)



@app.on_event("startup")
async def startup_event():
    print("Loading model and dataset...")
    clip_images.create_sample_images()
    clip_images.add_mole_images_to_benign()
    clip_images.load_dataset()
    print(f"Loaded {len(clip_images.embeddings)} images.")

@app.post("/analyze")
async def analyze_image(image_data):
    try:

        image_bytes = base64.b64decode(image_data.image)
        image = Image.open(BytesIO(image_bytes))
        
        temp_path = "temp_upload.jpg"
        image.save(temp_path)
        
        score, _ = clip_images.predict_image(temp_path)
        
        if os.path.exists(temp_path):
            os.remove(temp_path)
            
        if score is None:
            raise HTTPException(status_code=500, detail="Error processing image")
            
        result = "malignant" if score > 0.5 else "benign"
        return {
            "prediction": result,
            "confidence": score * 100,
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=3000) 