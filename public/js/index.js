
const getForecast = (location, callback) => {
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data) => {
            if(data.error){
                return callback({error: data.error}, undefined)
            }
            callback(undefined, {
                location : data.location,
                forecast: data.forecast,
                humidity: data.humidity
            })
        })
    })
}



const weatherForm = document.querySelector('form')
const searchInput = document.querySelector("input")
const firstMsg = document.getElementById("firstMsg")
const secondMsg = document.getElementById("secondMsg")

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = searchInput.value

    firstMsg.textContent = "Loading..."
    secondMsg.textContent = ""
    getForecast(location, (error, data) => {
        if(error){
           return firstMsg.textContent = error.error
        }
            firstMsg.textContent = "Location: " + data.location
            secondMsg.textContent = "Forecast: The weather is " + data.forecast +", Humidity is at "+ data.humidity + "%"
    })    
})