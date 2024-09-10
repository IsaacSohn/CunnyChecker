# Search Term Popup Extension

## Overview

This Chrome extension detects when you search for a specific term on Google and displays a popup with information about the term. The popup includes the name, age, and an image of a character from a predefined list.

## How It Works

1. **background.js**: 
   - This script runs in the background and listens for messages from other parts of the extension.
   - It handles storing the character data (name, age, URL) in Chrome's local storage when a match is found.
   - It also injects `content.js` into the current tab when a Google search is completed.

2. **content.js**:
   - This script is injected into the Google search results page.
   - It loads a list of characters from a `characters.json` file.
   - It checks if the search query matches any character names.
   - If a match is found, it sends a message to `background.js` to display the popup.

3. **popup.js**:
   - This script runs in the popup window when it is opened.
   - It retrieves the character data stored in Chrome's local storage.
   - It displays the character's name, age, and image in the popup.

4. **manifest.json**:
   - This is the configuration file for the extension.
   - It defines permissions, scripts, and other resources used by the extension.

5. **popup.html**:
   - This is the HTML file for the popup window.
   - It includes placeholders for displaying the character information.
