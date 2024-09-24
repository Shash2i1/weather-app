const button=document.getElementById('search-city-btn')
const apiKey='2fc65b1de8ada2a0482c8d17082efadf'
const time_sec=document.getElementById('time')

 setInterval(function(){
    const date=new Date()
    const time=date.toLocaleTimeString()

    time_sec.textContent= `${time}`
 },1000)

button.addEventListener('click', function(){

    const city=document.getElementById('city-input').value
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const info= document.getElementById('information-section')

    info.innerHTML=''
    fetch(apiurl)
        .then( response => response.json())

        .then( data=>{
            
            if(data.cod=== '404' )
            {
                alert(`Entered city (${city}) is not found`)
                return
            }
            console.log(data)
            const temp=data.main.temp
            const cityname=data.name
            const description=data.weather[0]?.description
            
            info.innerHTML=`
                <h2>City : ${cityname}</h2>
                <h2>Temperature : ${temp} °C</h2>
                <p>Description : ${description}</p>
            `
        })
        .catch( error =>{
            console.error(`ERROR :${error}`)
        })
})