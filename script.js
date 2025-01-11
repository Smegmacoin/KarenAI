function sendMessage() {
    const userMessage = document.getElementById('userMessage').value;
    const url = 'https://karenai-3cf70a46a331.herokuapp.com/chat'; // Replace with your Heroku backend URL

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerText = data.response;
        })
        .catch(error => {
            document.getElementById('response').innerText = 'Error: ' + error.message;
        });
}
