document.getElementById('startTest').addEventListener('click', startTest);
document.getElementById('generateCert').addEventListener('click', handleGenerateCertificate);

let startTime, interval;
let testText = "The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
let words = testText.split(' ');
let currentIndex = 0;

function startTest() {
    const userName = document.getElementById('userNameInput').value.trim();
    if (userName === '') {
        alert('Please enter your name to start the test.');
        return;
    }

    document.getElementById('userNameDisplay').innerText = userName;
    document.getElementById('typingArea').value = '';
    document.getElementById('timer').innerText = '60';
    document.getElementById('wpm').innerText = '0';
    document.getElementById('accuracy').innerText = '100';
    testSection.classList.remove('d-none');
    resultSection.classList.add('d-none');

    // Highlight the text to type
    updateTextWrapper();

    startTime = new Date();
    let countdown = 60;
    interval = setInterval(() => {
        countdown--;
        document.getElementById('timer').innerText = countdown;
        updateStats();
        if (countdown <= 0) {
            clearInterval(interval);
            endTest();
        }
    }, 1000);

    document.getElementById('typingArea').focus();
}

function updateTextWrapper() {
    let highlightedText = words.map((word, index) => {
        if (index < currentIndex) {
            return `<span class="highlight">${word}</span>`;
        } else if (index === currentIndex) {
            return `<span class="current">${word}</span>`;
        } else {
            return `<span>${word}</span>`;
        }
    }).join(' ');
    document.getElementById('textWrapper').innerHTML = highlightedText;
}

function updateStats() {
    let typedText = document.getElementById('typingArea').value;
    let timeElapsed = (new Date() - startTime) / 1000 / 60;
    let wordsTyped = typedText.split(' ').filter(word => word.length > 0).length;
    let wpm = Math.round(wordsTyped / timeElapsed);
    document.getElementById('wpm').innerText = wpm;

    let accuracy = calculateAccuracy(typedText);
    document.getElementById('accuracy').innerText = accuracy;
}

function endTest() {
    updateStats();
    testSection.classList.add('d-none');
    resultSection.classList.remove('d-none');
    document.getElementById('wpmResult').innerText = document.getElementById('wpm').innerText;
    document.getElementById('accuracyResult').innerText = document.getElementById('accuracy').innerText;
    document.getElementById('testDate').innerText = new Date().toLocaleDateString();
}

function calculateAccuracy(typedText) {
    let testWords = testText.split(' ');
    let typedWords = typedText.split(' ').filter(word => word.length > 0);
    let correctWords = typedWords.reduce((acc, word, i) => acc + (word === testWords[i] ? 1 : 0), 0);
    return Math.round((correctWords / testWords.length) * 100);
}

document.getElementById('typingArea').addEventListener('input', () => {
    let typedText = document.getElementById('typingArea').value.split(' ');
    if (typedText.length > currentIndex) {
        currentIndex = typedText.length;
        updateTextWrapper();
    }
});

function handleGenerateCertificate() {
    const userName = document.getElementById('userNameDisplay').innerText;
    const wpm = document.getElementById('wpmResult').innerText;
    const accuracy = document.getElementById('accuracyResult').innerText;
    const testDate = document.getElementById('testDate').innerText;

    generateCertificate(userName, wpm, accuracy, testDate);
}
