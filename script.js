document.getElementById("sendButton").addEventListener("click", sendMessage);

function sendMessage() {
    const message = document.getElementById("userMessage").value.trim();
    if (!message) return;

    // Display user's message
    document.getElementById("messages").innerHTML += `<p>You: ${message}</p>`;
    document.getElementById("userMessage").value = ""; // Clear input field
    document.getElementById("error").style.display = "none"; // Hide error

    // Show typing indicator
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("green-line");
    document.getElementById("messages").appendChild(typingIndicator);

    // Send the message to the backend
    fetch("https://karenai-3cf70a46a331.herokuapp.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            // Remove typing indicator
            typingIndicator.remove();

            if (data.response) {
                document.getElementById("messages").innerHTML += `<p>Karen AI: ${data.response}</p>`;
            } else {
                document.getElementById("messages").innerHTML += `<p>Karen AI: I didn't understand that.</p>`;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            typingIndicator.remove();
            document.getElementById("error").style.display = "block"; // Show error message
        });
}