function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();

    if (message) {
        // Display user's message
        const messagesDiv = document.getElementById("messages");
        const userMessage = document.createElement("div");
        userMessage.textContent = `You: ${message}`;
        messagesDiv.appendChild(userMessage);

        // Send the message to the backend
        fetch('https://karenai-3cf70a46a331.herokuapp.com/chat', { // Replace with your backend URL if different
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display Karen AI's response
                const aiMessage = document.createElement("div");
                aiMessage.textContent = `Karen AI: ${data.response}`;
                messagesDiv.appendChild(aiMessage);
                messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
                const errorMessage = document.createElement("div");
                errorMessage.textContent = "Karen AI: There was an error connecting to the server.";
                messagesDiv.appendChild(errorMessage);
            });

        input.value = ""; // Clear the input field
    }
}