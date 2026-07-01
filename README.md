# discord-stream-status

Simple self-bot utility to display a persistent purple "Streaming" presence on Discord. 

Unlike standard Rich Presence tools, this lightweight Node.js script automatically parses direct image URLs (like Pinterest or Imgur) and maintains a customizable, permanent Streaming status for standard Discord user accounts.

## ✨ Features

* **Purple Streaming Status:** Forces the Discord client to display the coveted purple streaming indicator.
* **Fully Customizable RPC:** Modify details, state, party size, and timestamps.
* **Direct Image Support:** No need to upload images to Discord first or use proxy links. Just paste any public image URL.
* **Interactive Buttons:** Add clickable buttons to your profile (visible to other users).
* **JSON Configuration:** Easy to set up without touching the core JavaScript logic.

## ⚠️ Disclaimer & TOS Warning

**USE AT YOUR OWN RISK.** This project uses a user token (self-botting), which technically violates [Discord's Terms of Service](https://discord.com/terms). While simply updating your Rich Presence rarely results in bans, abusing the API or sharing your token will compromise your account. 
* **NEVER** share your `DISCORD_TOKEN`.
* **NEVER** commit your `.env` file to GitHub.

## 🛠️ Prerequisites

* [Node.js](https://nodejs.org/) installed on your machine.
* Your Discord **User Token** (Found via Developer Tools in the Discord web client).
* A Discord **Application ID** (Create a dummy app in the [Discord Developer Portal](https://discord.com/developers/applications)).

## 🚀 Installation & Setup

**1. Clone the repository and install dependencies:**
```bash
git clone https://github.com/JukisYuri/discord-stream-status.git

cd discord-stream-status

npm install
```

**2. Setup Environment Variables:**
* Rename the provided .env.example file to .env and paste your Discord User Token inside:
```bash
DISCORD_TOKEN=your_discord_token_here
```
<details>
<summary><b>❓ How to find your Discord User Token (Click to expand)</b></summary>

- Open Discord in your web browser (Chrome, Edge, or Firefox) and log in.
- Press `F12` (or `Ctrl + Shift + I`) to open the **Developer Tools**.
- Navigate to the **Network** tab.
- Send a message in any channel or direct message to trigger network activity.
- In the filter/search box, type `messages` or `science` and click on one of the network requests that appear.
- Scroll down to the **Request Headers** section and look for the `Authorization` line.
- The alphanumeric string next to it is your token. Copy it carefully!

> ⚠️ **SECURITY WARNING:** Do not share this token with anyone. Anyone with this token has full access to your account.
</details>

**3. Configure your Rich Presence:**
* Rename the config.example.json file to config.json. Open it and modify the fields to match your desired status:
```json
{
    "applicationId": "<YOUR_APPLICATION_ID>",
    "type": "STREAMING",
    "url": "https://twitch.tv/<YOUR_TWITCH_USERNAME>",
    "name": "<YOUR_STREAM_NAME>",
    "details": "<YOUR_STREAM_DESCRIPTION>",
    "state": "<YOUR_STREAM_STATE>",
    "useStartTimestamp": true,
    "party": {
      "current": 1,
      "max": 5
    },
    "assets": {
      "largeImage": "https://your-large-image.jpg",
      "largeText": "<YOUR_LARGE_IMAGE_TEXT>",
      "smallImage": "https://your-small-image.png",
      "smallText": "<YOUR_SMALL_IMAGE_TEXT>"
    },
    "buttons": [
      {
        "label": "<YOUR_BUTTON_LABEL>",
        "url": "<YOUR_BUTTON_URL>"
      }
    ]
  }
```
![Purple-Streaming-Status](image-1.png)
![Custom-Status](image.png)

**4. Run it and enjoy:**
```bash
node index.js
```

# License
This project is licensed under the MIT License - see the LICENSE file for details.
