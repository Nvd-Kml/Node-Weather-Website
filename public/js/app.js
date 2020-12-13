const wform = document.querySelector('form')
const search = document.querySelector('input')
const heading = document.querySelector('#heading')
const content = document.querySelector('#content')

wform.addEventListener('submit', (e) => {
    e.preventDefault()
    heading.textContent = 'Loading....'
    const location = search.value
    fetch("/weather?address="+location)
    .then((res) => res.json())
    .then((data) => {
        if(data.error)
            heading.textContent = data.error
        else {
            heading.textContent = data.PlaceName
            content.innerHTML = "Summary -> " + data.Summary + "<br/>" + "Curr_Temp. -> " + data.Curr_Temp +"<br/>" + "Max_Temp. -> " + 
                                data.Max_Temp + "<br/>" + "Precipitation -> " + data.Precipitation
        }
    })  
})