let date = new Date();

let calendarDates = document.getElementsByClassName('calendar-dates')[0];
console.log(calendarDates);
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

let  displayMonth = localStorage['displayedMonth'] || date.getMonth();
let displayYear = localStorage['displayYear'] || date.getFullYear();

populateCalendaer(displayMonth, displayYear);

function populateCalendaer(month, year){
    const firstDay = new Date(year, month, 1).getDay(); //returns Sunday - Saturday index : 0 - 6
    const lastDate = new Date(year, month+1, 0).getDate(); 

    console.log(firstDay);
    console.log(lastDate);
    
    const no_date = '<li></li>'

};