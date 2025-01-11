// scripts.js

function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (message) {
        // Display user message
        const messagesDiv = document.getElementById("messages");
        const userMessage = document.createElement("div");
        userMessage.textContent = `You: ${message}`;
        messagesDiv.appendChild(userMessage);

        // Send request to backend
        fetch('https://your-backend-url.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        })
            .then(response => response.json())
            .then(data => {
                const aiMessage = document.createElement("div");
                aiMessage.textContent = `Karen AI: ${data.response}`;
                messagesDiv.appendChild(aiMessage);
                messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
            })
            .catch(() => {
                const errorMessage = document.createElement("div");
                errorMessage.textContent = "Karen AI: There was an error connecting to the server.";
                messagesDiv.appendChild(errorMessage);
            });

        input.value = ""; // Clear input
    }
}