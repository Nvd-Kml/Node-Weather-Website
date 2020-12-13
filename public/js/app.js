const wform = document.querySelector('form')
const search = document.querySelector('input')
const heading = document.querySelector('#heading')
const content = document.querySelector('#content')

wform.addEventListener('submit', (e) => {
    e.preventDefault()
    heading.textContent = 'Loading....'
    const location = search.value
    fetch("http://localhost:3000/weather?address="+location)
    .then((res) => res.json())
    .then((data) => {
        if(data.error)
            heading.textContent = data.error
        else {
            heading.textContent = data.PlaceName
            content.textContent = data.Summary
        }
    })  
})