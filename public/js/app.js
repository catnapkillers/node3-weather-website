console.log('Client side javascript file is loded!')

// Fetch API
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageTwo.textContent = 'From Javascript'



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    // default behavior of forms is to trigger reload on submit. we want to avoid that. That's what e.preventDefault is doing
    
    messageOne.textContent = ''
    messageTwo.textContent = 'Loading...'
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            // console.log(data)
            if (data.error) {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
                console.log(data.error)
            } else {
                console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast  
            }
        })
    })
})

// fetch('http://localhost:3000/weather?address=boston').then((response) => {
//     response.json().then((data) => {
//         // console.log(data)
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.forecast)
//         }
//     })
// })

//don't track node_modules w/ git
//test change