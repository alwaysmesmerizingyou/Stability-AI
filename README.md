# Stable Diffusion 3.5 Text-to-Image Generator

A simple web interface for generating images using the Stability AI Stable Diffusion 3.5 Large model via the Hugging Face Inference API.

## Features

- Generate high-quality images from text prompts
- Adjust generation parameters like steps
- Negative prompting to exclude unwanted elements
- Download generated images
- Responsive design that works on desktop and mobile

## Prerequisites

1. A Hugging Face account
2. A Hugging Face API token with access to the Stable Diffusion 3.5 Large model

## Setup Instructions

1. **Get your Hugging Face API token**:
   - Go to [Hugging Face](https://huggingface.co/)
   - Sign up or log in to your account
   - Go to your profile → Settings → Access Tokens
   - Create a new token with read access

2. **Configure the application**:
   - Open the `script.js` file
   - Replace `YOUR_HUGGINGFACE_API_KEY` with your actual Hugging Face API token

3. **Run the application**:
   - Open the `index.html` file in a modern web browser
   - Alternatively, use a local server to serve the files (recommended)

## Using a Local Server (Recommended)

For the best experience, it's recommended to serve the files using a local web server. Here's how:

### Python 3

```bash
# Navigate to the project directory
cd path/to/project

# Start a simple HTTP server
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Node.js with http-server

```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to the project directory
cd path/to/project

# Start the server
http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

## Usage

1. Enter a detailed description of the image you want to generate in the prompt box
2. (Optional) Add a negative prompt to exclude unwanted elements
3. Adjust the number of generation steps (more steps = higher quality but slower generation)
4. Click "Generate Image"
5. Wait for the image to be generated (this may take some time)
6. Download the image or generate a new one

## Notes

- The first generation might take longer as the model loads
- For best results, be specific in your prompts
- The free tier of the Hugging Face Inference API has rate limits

## License

This project is open source and available under the [MIT License](LICENSE).
