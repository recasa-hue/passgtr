let originalText = '';
let intervalId;

function generatePassword() {
    const inputText = document.getElementById('inputText').value;
    if (inputText === '') {
        alert('Please enter some text');
        return;
    }

    originalText = inputText;

    const generatedPasswordElement = document.getElementById('generatedPassword');
    generatedPasswordElement.innerText = '';
    generatedPasswordElement.style.animation = 'blink 0.5s infinite';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    intervalId = setInterval(() => {
        let randomString = '';
        for (let i = 0; i < 12; i++) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        generatedPasswordElement.innerText = randomString;
    }, 100);

    setTimeout(() => {
        clearInterval(intervalId);
        const password = getConsistentPassword(inputText);
        generatedPasswordElement.innerText = `Password: ${password}`;
        generatedPasswordElement.style.animation = '';
    }, 3000);
}

function getConsistentPassword(inputText) {
    let hash = 0;
    for (let i = 0; i < inputText.length; i++) {
        const char = inputText.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }

    let password = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    const length = characters.length;

    for (let i = 0; i < 12; i++) {
        const index = Math.abs((hash + i * 31) % length);
        password += characters.charAt(index);
    }

    return password;
}

function toggleOriginal() {
    const originalTextElement = document.getElementById('originalText');
    if (originalTextElement.style.display === 'none') {
        originalTextElement.style.display = 'block';
        originalTextElement.innerText = `Original Text: ${originalText}`;
    } else {
        originalTextElement.style.display = 'none';
    }
}

function copyToClipboard() {
    const generatedPasswordElement = document.getElementById('generatedPassword');
    const copyButton = document.getElementById('copyButton');
    
    if (generatedPasswordElement.innerText) {
        const textToCopy = generatedPasswordElement.innerText.replace("Password: ", "");
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyButton.innerText = "Copied";
            setTimeout(() => {
                copyButton.innerText = "Copy Password";
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    }
}
