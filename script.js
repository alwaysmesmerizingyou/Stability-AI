document.addEventListener('DOMContentLoaded', () => {
    const apiKeyInput = document.getElementById('api-key');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const promptInput = document.getElementById('prompt');
    const negativePromptInput = document.getElementById('negative-prompt');
    const generateBtn = document.getElementById('generate-btn');
    const newPromptBtn = document.getElementById('new-prompt-btn');
    const downloadBtn = document.getElementById('download-btn');
    const modelSelect = document.getElementById('model-select');
    const aspectRatioSelect = document.getElementById('aspect-ratio');
    const stylePresetSelect = document.getElementById('style-preset');
    const stepsInput = document.getElementById('steps');
    const stepsValue = document.getElementById('steps-value');
    const cfgScaleInput = document.getElementById('cfg-scale');
    const cfgScaleValue = document.getElementById('cfg-scale-value');
    const seedInput = document.getElementById('seed');
    const creditsInfo = document.getElementById('credits-info');
    const resultSection = document.querySelector('.result-section');
    const placeholder = document.getElementById('placeholder');
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const errorMessage = document.getElementById('error-message');
    const generatedImage = document.getElementById('generated-image');

    const STABILITY_API_URL = 'https://api.stability.ai/v2beta/stable-image/generate/sd3';
    const MODELS = [
        { id: 'sd3-large-turbo', name: 'SD3 Large Turbo', credits: 6.5 },
        { id: 'sd3-large', name: 'SD3 Large', credits: 6.5 },
        { id: 'sd3-medium', name: 'SD3 Medium', credits: 6.5 },
    ];

    function init() {
        MODELS.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = `${model.name}`;
            option.title = `Cost: ${model.credits} credits per image`;
            modelSelect.appendChild(option);
        });
        modelSelect.value = 'sd3-large-turbo';
        updateCreditsInfo();

        const savedApiKey = localStorage.getItem('stabilityApiKey');
        if (savedApiKey) {
            apiKeyInput.value = savedApiKey;
        }

        updateStepValue();
        updateCfgScaleValue();

        setupEventListeners();
    }

    function setupEventListeners() {
        saveKeyBtn.addEventListener('click', saveApiKey);
        apiKeyInput.addEventListener('blur', saveApiKey);
        generateBtn.addEventListener('click', generateImage);
        newPromptBtn.addEventListener('click', () => setUIState('initial'));
        downloadBtn.addEventListener('click', downloadGeneratedImage);

        stepsInput.addEventListener('input', updateStepValue);
        cfgScaleInput.addEventListener('input', updateCfgScaleValue);
        modelSelect.addEventListener('change', updateCreditsInfo);

        promptInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                generateBtn.click();
            }
        });
    }

    function setUIState(state, data = {}) {
        [placeholder, loading, result, error].forEach(el => el.classList.add('hidden'));

        switch (state) {
            case 'initial':
                placeholder.classList.remove('hidden');
                promptInput.focus();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'loading':
                loading.classList.remove('hidden');
                generateBtn.classList.add('loading');
                generateBtn.disabled = true;
                resultSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            case 'success':
                generatedImage.src = data.imageUrl;
                generatedImage.alt = data.prompt;
                result.classList.remove('hidden');
                generateBtn.classList.remove('loading');
                generateBtn.disabled = false;
                break;
            case 'error':
                errorMessage.textContent = data.message || 'An unknown error occurred.';
                error.classList.remove('hidden');
                generateBtn.classList.remove('loading');
                generateBtn.disabled = false;
                break;
        }
    }

    async function generateImage() {
        const apiKey = apiKeyInput.value.trim();
        const prompt = promptInput.value.trim();

        if (!apiKey) {
            alert('Please enter your Stability AI API Key.');
            apiKeyInput.focus();
            return;
        }
        if (!prompt) {
            alert('Please enter a prompt.');
            promptInput.focus();
            return;
        }

        setUIState('loading');

        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('model', modelSelect.value);
        formData.append('aspect_ratio', aspectRatioSelect.value);
        formData.append('output_format', 'jpeg');

        const negativePrompt = negativePromptInput.value.trim();
        if (negativePrompt) formData.append('negative_prompt', negativePrompt);

        const stylePreset = stylePresetSelect.value;
        if (stylePreset) formData.append('style_preset', stylePreset);

        const seed = parseInt(seedInput.value, 10);
        if (seed > 0) formData.append('seed', seed);

        formData.append('steps', parseInt(stepsInput.value, 10));
        formData.append('cfg_scale', parseFloat(cfgScaleInput.value));

        try {
            const response = await fetch(STABILITY_API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Accept': 'image/*'
                },
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors[0] : `HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            setUIState('success', { imageUrl, prompt });

        } catch (err) {
            console.error(err);
            setUIState('error', { message: err.message });
        }
    }

    async function downloadGeneratedImage() {
        const imageUrl = generatedImage.src;
        if (!imageUrl) return;

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);

            const filename = (promptInput.value.trim().substring(0, 50) || 'generated-image').replace(/[^a-z0-9]/gi, '_').toLowerCase();
            link.download = `${filename}.jpeg`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Could not download the image.');
        }
    }

    function saveApiKey() {
        const apiKey = apiKeyInput.value.trim();
        if (apiKey) {
            localStorage.setItem('stabilityApiKey', apiKey);
            saveKeyBtn.classList.add('saved');
            saveKeyBtn.querySelector('i').className = 'fa-solid fa-check';
            setTimeout(() => {
                saveKeyBtn.classList.remove('saved');
                saveKeyBtn.querySelector('i').className = 'fa-solid fa-save';
            }, 2000);
        } else {
            localStorage.removeItem('stabilityApiKey');
        }
    }

    function updateStepValue() {
        stepsValue.textContent = stepsInput.value;
    }
    function updateCfgScaleValue() {
        cfgScaleValue.textContent = cfgScaleInput.value;
    }
    function updateCreditsInfo() {
        const selectedModel = MODELS.find(m => m.id === modelSelect.value);
        if (selectedModel) {
            creditsInfo.textContent = `(${selectedModel.credits} credits)`;
        }
    }

    init();
});