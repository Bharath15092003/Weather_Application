fetch("https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=<api-key>")
.then((res)=> res.json())
.then((data)=> {
    console.log(data);
    putdata(data);
    getforecast(data);
});

function putdata(data){

    document.getElementById('city-name').innerHTML=data.name;
    var imgurl='https://api.openweathermap.org/img/w/'+ data.weather[0].icon +'.png';
    document.getElementById('img-at-main').src = imgurl;
    document.getElementById('temp-at-main').innerHTML=Math.floor(data.main.temp- 273);
    document.getElementById('nature-at-main').innerHTML=data.weather[0].description;
    document.getElementById('feels-at-main').innerHTML=Math.floor(data.main.feels_like-273);

    
    document.getElementById('humidity-at-info').innerHTML=data.main.humidity;
    document.getElementById('pressure-at-info').innerHTML=data.main.pressure;
    document.getElementById('temp-max').innerHTML=Math.floor(data.main.temp_max-273);
    document.getElementById('temp-min').innerHTML=Math.floor(data.main.temp_min-273);
    document.getElementById('visibility').innerHTML=data.visibility;
    document.getElementById('wind-speed').innerHTML=data.wind.speed;
    document.getElementById('wind-degrees').innerHTML=data.wind.deg;

    Rimg(data.wind.deg)
   
}

function getforecast(gap){
    var forecasturl='https://api.openweathermap.org/data/2.5/forecast?q='+gap.name+'&appid=<api-key>';
    fetch(forecasturl).then((res)=>res.json()).then((forecastdata) => {
        console.log(forecastdata);
        putforecastdata(forecastdata);
    });

}

function putforecastdata(forecastdata){

    document.querySelector('.future').innerHTML="";
    for(var i=0;i<forecastdata.list.length;i=i+8){
       
        con=document.createElement('div');
        con.setAttribute('class','nextday');
        
        tim=document.createElement('p');
        // tim.setAttribute('class','nextday')

        imag=document.createElement('img');
        imag.setAttribute('class','pic');

        fut=document.createElement('div');
        fut.setAttribute('class','future-container');

        tem=document.createElement('h1');
         

        cond=document.createElement('h3');

        imag.src='https://api.openweathermap.org/img/w/'+forecastdata.list[i].weather[0].icon+'.png';
        tem.innerHTML=Math.floor(forecastdata.list[i].main.temp-273)+'°C';
        cond.innerHTML=forecastdata.list[i].weather[0].description;
        var timedata = "ON:"+forecastdata.list[i].dt_txt;
        tim.innerHTML= timedata.substring(0, 13);

        fut.appendChild(tem);
        fut.appendChild(cond);
        
        con.appendChild(tim);
        con.appendChild(imag);
        con.appendChild(fut);

        document.querySelector('.future').appendChild(con);
    }

}

function searchCity(){
    var name=document.getElementById("search-container").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid=adc711dab7ec51eca210793f032dba96")
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        putdata(data);
        getforecast(data);
        

    });
}

function Rimg(d){
    var compass=document.getElementById("compassneedle");
    d=d-180;
    compass.style.rotate=d+'deg';
}


// var x= document.getElementsByClassName('nextday').onmouseover = function() {big()};
// var y= document.getElementsByClassName('nextday').onmouseout = function()  {normal()};
// function big(x){
//     x.style.height="170px";
//     x.style.width="260px";

// }
// function normal(y){
//     y.style.height="150px";
//     y.style.width="200px";
    // document.getElementsByClassName('nextday').style.height="150px";
    // document.getElementsByClassName('nextday').style.width="200px";

//}
function scrollR(){
    var s=document.querySelector('.future');
    s.scrollLeft -=100;
}


function scrollL(){
    var s=document.querySelector('.future');
    s.scrollLeft +=100;
}
