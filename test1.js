
// I LEFT SCRIPT 1, 2 ,3 BECAUSE IT WAS 3 VERSIONS OF THE CODE I WAS EXPERMIENTING WITH. 
/* 
const today = document.getElementById('today');
const forecast = document.getElementById('forecast');
const content = document.getElementById('content');
const textbox = document.getElementById('textbox');
const submit = document.getElementById('submit');

let city = 'Salt Lake City, UT'; //stay as default
const api = 'a84644abfa7f12748b882e98f62e897e';
let country = 'US';



let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api}&units=imperial`;


const main = data => {
    console.log(data);
    let now = `
    <h2>${city}</h2>
    <p>
     ${data.current.temp}&deg;F <br />
     ${data.current.weather[0].description} <br />
    <img src='http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png'></img>
    </p>`;
    today.innerHTML = now;
    
    let date = new Date();

    let otherDays = `<table border=''>`;

    for(let i=0; i<=4; i++) {
        the_day = new Date(date.setDate(date.getDate() + 1));
        otherDays += `
        <tr>
        <td><h2>${the_day.getMonth()+1}/${the_day.getDate()}</h2></td>
        <p>
        <td> ${data.daily[i].temp.day}&deg;F</td>
        </p>
        <td>${data.daily[i].weather[0].description}</td>
        <td><img src='http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png'></img></td>
        </tr>
        `;
    }
    otherDays += `</table>`;
    forecast.innerHTML = otherDays;
};



    const loadCity = () =>{
        let city = localStorage.getItem('city');
        if(city != null){
            content.innerHTML = `Enter a vaild city in City, State format`;
        }
    }
    
    const saveCity = () =>{
        localStorage.setItem('city', textbox.value);
        content.innerHTML = `${textbox.value}`;
        textbox.value = '';
    }

fetch(url)
    .then(response => response.json())
    .then(fiveDay_threeHour_data => {
        let lon = fiveDay_threeHour_data.city.coord.lon;
        let lat = fiveDay_threeHour_data.city.coord.lat;
        let new_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${api}`
        fetch(new_url)
            .then(response => response.json())
            .then(data => {
                main(data);
            });
    });



const btnClicked = evt => {
    loadCity();
    
}

    submit.addEventListener('click', saveCity);
