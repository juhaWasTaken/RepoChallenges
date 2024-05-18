const passwordBox = document.getElementById('password');
const length = 12;

const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbol = '!+-<>/{}[]_=@#$%^&*';

function createPassword() {
    let password = '';
    const characters = upperCase + lowerCase + numbers + symbol;

    for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * characters.length);
        password += characters[random];
    }

    passwordBox.value = password;
}

const copyText = async () => {
    try {
        await navigator.clipboard.writeText(passwordBox.value);
    } catch (err) {
        // console.error('Failed to copy: ', err);
        alert('Failed to copy');
    }
}
