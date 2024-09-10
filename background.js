// Listen for messages from content.js or other parts of the extension
chrome.runtime.onMessage.addListener(function(request) {
    // Check if the received message contains 'showPopup' as true
    if (request.showPopup) {
        // Store the name, age, and URL in chrome.storage.local
        // This allows the data to be accessed later even if the popup closes
        chrome.storage.local.set({ name: request.name, age: request.age, url: request.url }, function() {
            // Check if there was an error during the storage process
            if (chrome.runtime.lastError) {
                console.error("Error setting chrome.storage:", chrome.runtime.lastError);
            } else {
                console.log("Data stored successfully.");
                // Open the popup to show the character information
                // The popup displays the stored information to the user
                chrome.action.openPopup();
            }
        });
    }
});

// Listen for when a navigation to a specific URL is completed
chrome.webNavigation.onCompleted.addListener(function(details) {
    // Inject content.js into the current tab to analyze the page content
    // This script is responsible for extracting the necessary data from the page
    chrome.scripting.executeScript({
        target: { tabId: details.tabId },  // Specifies the tab where the script will be injected
        files: ['content.js']  // The file to be injected into the tab
    }, () => {
        // Handle any errors that occur during script injection
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }
    });
}, { 
    // Restrict this listener to specific URLs matching the pattern
    url: [{ urlMatches: 'https://www.google.com/search*' }] 
    // This ensures that the script is only injected into Google search results pages
});
