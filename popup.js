// When the popup is opened, retrieve the stored character data
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['name', 'age', 'url'], function(result) {
        if (result.name && result.age) {
            // If character data is found, display it in the popup
            document.getElementById('name').textContent = 'Name: ' + result.name;
            document.getElementById('age').textContent = 'Age: ' + result.age;
            document.getElementById('image').src = result.url;
        } else {
            // If no character data is found, display a default message
            document.getElementById('name').textContent = 'No matching character found';
            document.getElementById('age').textContent = '';
        }
    });
});
