const textInput = document.getElementById('text-input');
const convertBtn = document.getElementById('convert-btn');
const audioOutput = document.getElementById('audio-output');
const statusDiv = document.getElementById('status');
const serverUrl = 'http://localhost:3000/convert-text';

convertBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();

    if (!text) {
        statusDiv.textContent = 'Please enter some text.';
        return;
    }

    statusDiv.textContent = 'Converting...';
    convertBtn.disabled = true;
    audioOutput.innerHTML = ''; // Clear previous audio

    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        // Get the audio data as a blob and create a URL
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);

        // Create an audio element and play the sound
        const audio = new Audio(audioUrl);
        audio.controls = true;
        audio.play();

        audioOutput.innerHTML = '<h3>Audio Playback:</h3>';
        audioOutput.appendChild(audio);

        statusDiv.textContent = 'Conversion successful!';

    } catch (error) {
        console.error('Error:', error);
        statusDiv.textContent = `Error: ${error.message}`;
    } finally {
        convertBtn.disabled = false;
    }
});
