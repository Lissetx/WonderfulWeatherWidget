const today = document.getElementById('today');
const forecast = document.getElementById('forecast');
const content = document.getElementById('content');
const textbox = document.getElementById('textbox');
const submit = document.getElementById('submit');
const extraInfo = document.getElementById('extraInfo');
const submitExtra = document.getElementById('submitExtra');
const starryNight =  document.getElementById('starryNight');


let city = localStorage.getItem('city'); //stay as default
const api = 'a84644abfa7f12748b882e98f62e897e';
let country = 'US';
let feelslike = '1';
let advice = 'default';



let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${api}&units=imperial`;


const main = data => {
    console.log(data);
    feelslike = data.current.feels_like;
    let now = `
    <h2>Current: ${city}</h2>
    <p>
    ${data.current.temp}&deg;F <br />
    ${data.current.weather[0].description} <br />
    <img src='http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png'></img>
    </p>
    `;
    today.innerHTML = now;
    
    let date = new Date();

    let otherDays = `<table border=''>
    <caption><h2>${city}</h2></caption>`;

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

    const extraClicked = data => {
    if (Number(feelslike) >= 65){
            advice = 'Beautiful day outside wear some shorts!' ;
    }
    else if (Number(feelslike) >= 45){
            advice = 'Its a little chilly out grab a jacket!' ;
    }
    else {
            advice = 'Bundle up its cold out!';
    }
    console.log(feelslike);
    console.log(advice);
    let adviceText =`
    <p>
    Feels Like: ${feelslike}&deg;F </br>
    ${advice}</br>
    </p>  
    `;
    extraInfo.innerHTML = adviceText; 
}

    const loadCity = () =>{
        let city = localStorage.getItem('city');
        if(city != null){
            content.innerHTML = city;
            window.location.reload();
            window.location.reload(true);
        }
    }
    
    const saveCity = () =>{
        localStorage.setItem('city', textbox.value);
        content.innerHTML = `${textbox.value}`;
        textbox.value = '';
        window.location.reload();
        window.location.reload(true);
    }
    const seeTheStars = () =>{
        document.getElementById('body').style.visibility = "hidden";
        document.getElementById('submit').style.visibility = "hidden";
        document.getElementById('submitExtra').style.visibility = "hidden";
        var audio =  document.getElementById("myAudio");
        audio.volume = 0.06;
        audio.play();
    }
    const returnText = () =>{
        document.getElementById('body').style.visibility = "visible";
        document.getElementById('submit').style.visibility = "visible";
        document.getElementById('submitExtra').style.visibility = "visible";
        document.getElementById("myAudio").pause();
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
    submit.addEventListener('click', saveCity);
    submitExtra.addEventListener('click', extraClicked);
    starryNight.addEventListener('mouseover', seeTheStars);
    starryNight.addEventListener('mouseout', returnText);