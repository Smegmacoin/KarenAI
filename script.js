document.getElementById("sendButton").addEventListener("click", sendMessage);

function sendMessage() {
    const message = document.getElementById("userMessage").value.trim();
    if (!message) return;

    const messagesContainer = document.getElementById("messages");
    const typingEffect = document.getElementById("typing-effect");

    // Add user's message
    messagesContainer.innerHTML += `<p>You: ${message}</p>`;
    document.getElementById("userMessage").value = ""; // Clear input field

    // Show typing effect
    typingEffect.style.display = "block";

    // Send the message to the backend
    fetch("https://karenai-3cf70a46a331.herokuapp.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
    })
        .then((response) => response.json())
        .then((data) => {
            typingEffect.style.display = "none"; // Hide typing effect
            if (data.response) {
                messagesContainer.innerHTML += `<p>Karen AI: ${data.response}</p>`;
            } else {
                messagesContainer.innerHTML += `<p>Karen AI: I didn't understand that.</p>`;
            }
        })
        .catch((error) => {
            typingEffect.style.display = "none"; // Hide typing effect
            document.getElementById("error").style.display = "block"; // Show error message
            console.error("Error:", error);
        });
}