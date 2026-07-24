import os
from PIL import Image
import glob

def optimize_images(directory):
    for ext in ('*.jpg', '*.png'):
        for file in glob.glob(os.path.join(directory, ext)):
            try:
                with Image.open(file) as img:
                    # Convert RGBA to RGB for JPEG if needed
                    if img.mode == 'RGBA':
                        img = img.convert('RGB')
                        
                    # Save as WebP
                    webp_path = os.path.splitext(file)[0] + '.webp'
                    img.save(webp_path, 'webp', quality=80, method=4)
                    print(f"Optimized: {os.path.basename(file)} -> {os.path.basename(webp_path)}")
            except Exception as e:
                print(f"Error optimizing {file}: {e}")

if __name__ == "__main__":
    img_dir = r"C:\Users\vitor\.gemini\antigravity\scratch\site-Adriano-new\src\assets\images"
    optimize_images(img_dir)
