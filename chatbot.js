// Webhook URL for make.com scenario
const WEBHOOK_URL = "https://hook.eu2.make.com/63uhbidi34ap8l6a0u658l9sdmkp5aqb";

class ChatApplication {
  constructor() {
    this.elements = {
      chatContainer: document.getElementById('chat-container'),
      questionForm: document.getElementById('question-form'),
      questionInput: document.getElementById('question-input'),
    };

    this._initializeEventListeners();
  }

  _initializeEventListeners() {
    this.elements.questionForm.addEventListener('submit', (e) => this._handleSubmit(e));
  }

  async _handleSubmit(e) {
    e.preventDefault();
    const question = this.elements.questionInput.value.trim();

    if (!question) {
      this._addMessage("Please enter a valid question.", "system");
      return;
    }

    // Display user message in the chat
    this._addMessage(question, "user");
    this.elements.questionInput.value = '';

    // Send question to the webhook and handle the response
    try {
      const response = await this._sendQuestionToWebhook(question);
      this._handleResponse(response);
    } catch (error) {
      this._addMessage("An error occurred. Please try again.", "system");
      console.error("Webhook error:", error);
    }
  }

  async _sendQuestionToWebhook(question) {
    // Send the question to the make.com webhook and return the response
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, user_id: "12345" }) // Include user_id or other context if needed
    });
    if (!response.ok) {
      throw new Error("Failed to send question to webhook.");
    }
    return await response.json();
  }

  _handleResponse(response) {
    // Handle the response returned by the webhook
    if (response.type === "INFORMATION") {
      this._addMessage(response.message, "ai"); // Direct response
    } else if (response.type === "PANEL_ADVICE") {
      response.panelists.forEach(panelist => {
        this._addMessage(panelist.response, "ai", panelist);
      });
    } else if (response.type === "USER_ACTION") {
      this._addMessage(response.message, "system");
      response.options.forEach(option => {
        this._addMessage(`- ${option}`, "system");
      });
    } else {
      this._addMessage("Unexpected response type. Please try again.", "system");
    }
  }

  _addMessage(text, type, panelist = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);

    if (panelist) {
      // Include avatar and color for panelist responses
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
    } else {
      // Regular message bubble
      const bubbleDiv = document.createElement('div');
      bubbleDiv.classList.add('message-bubble');
      bubbleDiv.textContent = text;
      messageDiv.appendChild(bubbleDiv);
    }

    this.elements.chatContainer.appendChild(messageDiv);
    this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
  }
}

// Initialize the chatbot when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => new ChatApplication());
  }
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
          avatar_url: "https://blkoutuk.com/wp-content/uploads/2024/12/askoomfpanel1-4.png",
          color: "#4CAF50",
          response: "Mental health challenges require a community-focused approach...",
          audio_url: null // Replace with a hosted audio file URL
        },
        {
          name: "Ms. Tanya Roberts",
          avatar_url: "https://blkoutuk.com/wp-content/uploads/2024/12/9.png",
          color: "#FFC107",
          response: "Support spaces are essential for emotional well-being...",
          audio_url: null // Replace with a hosted audio file URL
        },
        {
          name: "Prof. Emmanuel Adebola",
          avatar_url: "https://blkoutuk.com/wp-content/uploads/2024/12/askoomfpanel1-5.png",
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
