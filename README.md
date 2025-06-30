# Stability AI Text-to-Image Generator

A simple web interface for generating images using the Stability AI Stable Diffusion 3.5 model.

## Features

- Generate high-quality images from text prompts
- Adjust generation parameters like steps and guidance scale
- Negative prompting to exclude unwanted elements
- Download generated images
- Responsive design that works on desktop and mobile
- Save your API key for future use

## Prerequisites

1. A Stability AI account
2. A Stability AI API key

## Setup Instructions

1. **Get your Stability AI API key**:
   - Go to [Stability AI Platform](https://platform.stability.ai/)
   - Sign up or log in to your account
   - Navigate to your account settings
   - Create a new API key

2. **Run the application**:
   - Open the `index.html` file in a modern web browser
   - Enter your Stability AI API key when prompted
   - Click "Save" to store your API key for future use
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

1. Enter your Stability AI API key (only required on first use)
2. Enter a detailed description of the image you want to generate in the prompt box
3. (Optional) Add a negative prompt to exclude unwanted elements
4. Adjust the generation parameters:
   - Steps: More steps = higher quality but slower generation
   - Guidance Scale: Higher values make the output closer to the prompt
5. Click "Generate Image"
6. Wait for the image to be generated
7. Download the image or generate a new one

## Notes

- Your API key is stored locally in your browser's local storage
- For best results, be specific and detailed in your prompts
- The generation time depends on the number of steps and server load

## License

This project is open source and available under the [MIT License](LICENSE).
