
const search_btn = document.getElementById('search')
const temp_info = document.getElementById('temp-info')
const time_section = document.getElementById('time-section')
const apiKey = '2fc65b1de8ada2a0482c8d17082efadf'
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const image_diagram = document.getElementById('image-diagram')

const day_section = document.getElementById('day-section')

search_btn.addEventListener('click', getinfo)

const date = new Date()
console.log(days[date.getDay()])
day_section.innerHTML =
    `
    <h1>${days[date.getDay()]}</h1>
    <p>${date.toDateString()}</p>
`

setInterval(function(){
    const time = new Date()
    time_section.innerHTML = `
                                <h2>${time.toLocaleTimeString()}</h2>
                            `
},100)




function getinfo() {
    const city = document.getElementById('city-input').value;
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiurl)
        .then(response => response.json())
        .then(data => {

            if (data.cod === '404') {
                alert(`Entered City ${city} is not found`)
                return
            }
            console.log(data)
            const tempRead = data.main.temp
            temp_info.innerHTML =
                `
                <div class="info">
                    <h3>NAME</h3><span><h3>${data.name}</h3></span>
                </div>
                <div class="info">
                    <h3>TEMP</h3><span><h3>${tempRead} °C</h3></span>
                </div>
                <div class="info">
                    <h3>HUMIDITY</h3><span><h3>${data.main.humidity} %</h3></span>
                </div>
                <div class="info">
                    <h3>WIND SPEED</h3><span><h3>${data.wind.speed} Km/h</h3></span>
                </div>
            `

            const temp_section = document.getElementById('temp-section')
            temp_section.innerHTML =
                `
                    <h1>${tempRead} °C</h1>
                    <p>${data.weather[0].description}</p>

                `

                getimage(tempRead)
            
        })
        .catch(error => {
            console.log('ERROR', error)
        })


        

}

function getimage(temp){

    if( temp < 0)
        {
            image_diagram.innerHTML = ` <h1>❄️</h1>`
        }
    if((temp >= 0)&&(temp <= 5))
        {
            image_diagram.innerHTML = ` <h1>🌬️</h1>`
        }
    if((temp > 5 )&&(temp <=15 ))
        {
            image_diagram.innerHTML = ` <h1>🌥️</h1>`
        }

    if((temp > 15 )&&(temp <=20 ))
        {
            image_diagram.innerHTML = ` <h1>🌤️</h1>`
        }
    if((temp > 20 )&&(temp <=25 ))
        {
            image_diagram.innerHTML = ` <h1>☀️</h1>`
        }
    if((temp > 25 )&&(temp <=35 ))
        {
            image_diagram.innerHTML = ` <h1>🌞</h1>`
        }
    if((temp > 35 )&&(temp <=40 ))
        {
            image_diagram.innerHTML = ` <h1>🔥</h1>`
        }
    if((temp > 40 ))
        {
            image_diagram.innerHTML = ` <h1>🔥</h1>`
        }
}