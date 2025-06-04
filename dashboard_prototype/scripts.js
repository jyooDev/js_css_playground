let date = new Date();
const months = {
    0:'January',
    1:'February',
    2:'March',
    3:'April',
    4:'May',
    5:'June',
    6:'July',
    7:'August',
    8:'September',
    9:'Octeber',
    10:'November',
    11:'December',
}

let calendarDates = document.getElementsByClassName('calendar-dates')[0];
let  displayMonth = sessionStorage['displayedMonth'] || date.getMonth();
let displayYear = sessionStorage['displayYear'] || date.getFullYear(); 
populateCalendar(displayMonth+1, displayYear);


function populateCalendar(month, year){
    populateHeader(month, year)
    populateDates(month,year)
};

function populateHeader(month, year){
    const calendarMonthYear = document.getElementsByClassName('calendar-month-year')[0];
    console.log(calendarMonthYear)
    calendarMonthYear.innerHTML = `<span>${months[month]}</span><span>${year}</span>`;
}

function populateDates(month, year){
    const firstDay = new Date(year, month, 1).getDay(); //returns Sunday - Saturday index : 0 - 6
    const lastDate = new Date(year, month+1, 0).getDate(); 
    const lastDay = new Date(year, month+1, 0).getDay();
    
    let dateFromLastMonth = new Date(year, month,1-firstDay).getDate(); 
    for(let i = 0; i < firstDay; i++){
        const li = document.createElement('li');
        li.textContent = `${dateFromLastMonth++}`;
        li.classList.add('calendar-date', 'calendar-item', 'grey-text');
        calendarDates.appendChild(li);
    }
    
    for(let i = 1; i <= lastDate; i++)
    {
        let li = document.createElement('li');
        li.classList.add('calendar-date', 'calendar-item');
        li.textContent = `${i}`;
        calendarDates.appendChild(li)
    }

    for(let i = 1; i <= 6 - lastDay; i++)
    {
        const li = document.createElement('li');
        li.textContent = `${i}`;
        li.classList.add('calendar-date', 'calendar-item', 'grey-text');
        calendarDates.appendChild(li);
    }
}