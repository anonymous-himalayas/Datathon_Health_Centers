import os
import torch
import clip
from PIL import Image
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


device = "cuda" if torch.cuda.is_available() else "cpu"

# Load CLIP model and preprocessing
model, preprocess = clip.load("ViT-B/32", device=device)