import os

def generateImageUrl(self):
        # Replace spaces in product name with underscores and add .jpg extension
        filename = f"{self.name.replace(' ', '_')}.jpg"
        # Assuming images are stored in a folder named 'product_images' within MEDIA_URL
        return os.path.join('productImages', filename)