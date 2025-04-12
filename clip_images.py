import os
import torch
import clip
from PIL import Image
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import cv2
import random
import shutil

# Set device
device = "cuda" if torch.cuda.is_available() else "cpu"


model, preprocess = clip.load("ViT-B/32", device=device)

# files
benign_path = "sample_images/benign"
malignant_path = "sample_images/malignant"


embeddings = []
labels = []

def create_sample_images():
    isic_train = pd.read_csv('isic-2024-challenge/train-metadata.csv')
    
    if os.path.exists('sample_images'):
        shutil.rmtree('sample_images')
    os.makedirs('sample_images')
    os.makedirs('sample_images/malignant')
    os.makedirs('sample_images/benign')
    
    # add malignant images to the directory
    mal_images = isic_train[isic_train['target'] == 1]
    mal_images = mal_images['isic_id'].tolist()


    for i in range(len(mal_images)):
        source_path = mal_images[i] + '.jpg'
        destination_path = os.path.join('sample_images/malignant', source_path).replace("\\","/")
        shutil.copy('isic-2024-challenge/train-image/image/' + source_path, destination_path) 
       
        
        
    # add random benign images to the directory
    benign_images = isic_train[isic_train['target'] == 0]
    benign_images = benign_images['isic_id'].tolist()

    benign_images = random.sample(benign_images, len(mal_images) * 2)

    for i in range(len(benign_images)):
        source_path = benign_images[i] + '.jpg'
        destination_path = os.path.join('sample_images/benign', source_path)
        shutil.copy('isic-2024-challenge/train-image/image/' + source_path, destination_path)

def embed_image(image_path):
    try:
        image = preprocess(Image.open(image_path).convert("RGB")).unsqueeze(0).to(device)
        with torch.no_grad():
            embedding = model.encode_image(image)
        return embedding.cpu().numpy()
    except Exception as e:
        print(f"Error loading {image_path}: {e}")
        return None


def load_dataset():
    # number of files in benign and malignant folders
    benign_files = len(os.listdir(benign_path))
    malignant_files = len(os.listdir(malignant_path))
    print(benign_files, malignant_files)
    for label, folder in [(0, benign_path), (1, malignant_path)]:
        print(f"Loading {folder}...")
        for filename in os.listdir(folder):
            if filename.lower().endswith((".jpg", ".jpeg", ".png")):
                path = os.path.join(folder, filename)
                emb = embed_image(path)
                if emb is not None:
                    embeddings.append(emb)
                    labels.append(label)


def predict_image(uploaded_image_path, top_k=10):
    test_emb = embed_image(uploaded_image_path)
    if test_emb is None:
        return None, None

    all_embeddings = np.vstack(embeddings)
    similarities = cosine_similarity(test_emb, all_embeddings)[0]

    
    top_indices = np.argsort(similarities)[-top_k:]
    top_labels = [labels[i] for i in top_indices]

    
    malignant_score = sum(top_labels) / top_k
    return malignant_score, top_indices


if __name__ == "__main__":
    print("Loading dataset and computing embeddings...")
    create_sample_images() 
    load_dataset()
    print(f"Loaded {len(embeddings)} images.")

    # test
    uploaded_img = "normal2.jpg"  
    score, _ = predict_image(uploaded_img)

    if score is not None:
        print(f"Malignancy likelihood: {round(score * 100, 2)}%")
    else:
        print("Failed to compute similarity.")
