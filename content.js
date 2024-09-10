// Fetch the characters.json file to load character data
fetch(chrome.runtime.getURL('characters.json'))
    .then(response => response.json())
    .then(characters => {
        // Get the search query from the URL parameters
        const query = new URLSearchParams(window.location.search).get('q').toLowerCase();
        let matchedCharacter = null;

        // Check if the search query matches any character name in the JSON data
        characters.forEach(character => {
            if (query.includes(character.name.toLowerCase())) {
                matchedCharacter = character;
            }
        });

        // If a matching character is found, send a message to background.js
        if (matchedCharacter) {
            chrome.runtime.sendMessage({
                showPopup: true,
                name: matchedCharacter.name,
                age: matchedCharacter.age,
                url: matchedCharacter.url
            });
        }
    })
    .catch(error => console.error('Error loading characters:', error));
