const form = document.querySelector('form');
const errorMessage = document.getElementById('err');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    await Myapi(username, password);
});

const Myapi = async (username, password) => {
    try {
        const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            errorMessage.style.display = 'block';
            return;
        }

        const json = await response.json();
        console.log(json);

        // شما می‌توانید در اینجا کارهای دیگری مانند هدایت به صفحه دیگر انجام دهید
        errorMessage.style.display = 'none'; // در صورت موفقیت، خطا را مخفی کنید

    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
    }
}

