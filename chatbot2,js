// ChatApplication: Chatbot with Avatar and Audio Support
class ChatApplication {
  constructor() {
    // Define elements
    this.chatContainer = document.getElementById('chat-container');
    this.questionForm = document.getElementById('question-form');
    this.questionInput = document.getElementById('question-input');
    
    // Initialize event listeners
    this.questionForm.addEventListener('submit', (e) => this._handleSubmit(e));
  }

  // Add a message to the chat
  _addMessage(text, type, panelist = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);

    // If a panelist is speaking, include their avatar and styling
    if (panelist) {
      const avatar = document.createElement('img');
      avatar.src = panelist.avatar_url;
      avatar.alt = `${panelist.name}'s avatar`;
      avatar.className = 'avatar';
      messageDiv.appendChild(avatar);

      const bubbleDiv = document.createElement('div');
      bubbleDiv.classList.add('message-bubble');
      bubbleDiv.style.backgroundColor = panelist.color || '#ddd';
      bubbleDiv.textContent = text;
      messageDiv.appendChild(bubbleDiv);

      // Add audio playback if available
      if (panelist.audio_url) {
        const audio = document.createElement('audio');
        audio.src = panelist.audio_url;
        audio.controls = true;
        messageDiv.appendChild(audio);
      }
    } else {
      // User or system message
      const bubbleDiv = document.createElement('div');
      bubbleDiv.classList.add('message-bubble');
      bubbleDiv.textContent = text;
      messageDiv.appendChild(bubbleDiv);
    }

    // Append message to the chat container
    this.chatContainer.appendChild(messageDiv);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  }

  // Handle form submission
  async _handleSubmit(e) {
    e.preventDefault();
    const question = this.questionInput.value.trim();
    if (!question) return;
    
    // Add user question to the chat
    this._addMessage(question, 'user');
    this.questionInput.value = '';

    // Simulate API response (replace this with an actual API call)
    const response = await this._mockResponse();
    this._handleResponse(response);
  }

  // Handle API responses
  _handleResponse(response) {
    if (response.type === "PANEL_ADVICE") {
      response.panelists.forEach(panelist => {
        this._addMessage(panelist.response, 'ai', panelist);
      });
    } else {
      this._addMessage(response.message, 'ai');
    }
  }

  // Simulated API response for testing
  async _mockResponse() {
    return {
      type: "PANEL_ADVICE",
      panelists: [
        {
          name: "Dr. Alex Johnson",
          avatar_url: "https://example.com/avatars/dr-alex.png",
          color: "#4CAF50",
          response: "Mental health challenges require a community-focused approach...",
          audio_url: null // Replace with a hosted audio file URL
        },
        {
          name: "Ms. Tanya Roberts",
          avatar_url: "https://example.com/avatars/ms-tanya.png",
          color: "#FFC107",
          response: "Support spaces are essential for emotional well-being...",
          audio_url: null // Replace with a hosted audio file URL
        },
        {
          name: "Prof. Emmanuel Adebola",
          avatar_url: "https://example.com/avatars/prof-adebola.png",
          color: "#2196F3",
          response: "Diaspora connections bridge important cultural gaps...",
          audio_url: null // Replace with a hosted audio file URL
        }
      ]
    };
  }
}

// Initialize the chatbot when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => new ChatApplication());
