//client side javascript to fetch the forecast info

// to make HTTP request from client side we need to use 
// the "fetch" API (browser base API)
// not used in node js

const weatherForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const para_one = document.querySelector("#p1")
const para_two = document.querySelector("#p2")

para_one.textContent = ''
para_two.textContent = ''

//when the form is submitted
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault(); // this is to prevent the default behaviour of the form that when it submits it reloads the page again
    const location = searchTerm.value

    para_one.textContent = 'loading...'
    para_two.textContent = ''

    fetch('http://127.0.0.1:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                para_one.textContent = data.error
            }
            else {
                para_one.textContent = data.location;
                para_two.textContent = data.forecast;
            }
        })
    })
})