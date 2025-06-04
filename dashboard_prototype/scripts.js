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

const calendarDates = document.getElementsByClassName('calendar-dates')[0];
const  displayMonth = sessionStorage['displayedMonth'] || date.getMonth();
const displayYear = sessionStorage['displayedYear'] || date.getFullYear();
const TOTAL_DATE_CT = 42;
sessionStorage.setItem('displayedMonth', displayMonth)
sessionStorage.setItem('displayedYear', displayYear)
populateCalendar(displayMonth, displayYear);

function populateCalendar(month, year){
    populateHeader(month, year)
    calendarDates.innerHTML = '';
    populateDates(month,year)
};

function populateHeader(month, year){
    const calendarMonthYear = document.getElementsByClassName('calendar-month-year')[0];
    calendarMonthYear.innerHTML = `<span>${year}</span><span>${months[month]}</span>`;
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

    const calendarDateContainer = document.getElementsByClassName('calendar-dates')[0];
    let numDatesLeft = TOTAL_DATE_CT - calendarDateContainer.getElementsByTagName('li').length;
    for(let i = 1; i <= numDatesLeft; i++)
    {
        const li = document.createElement('li');
        li.textContent = `${i}`;
        li.classList.add('calendar-date', 'calendar-item', 'grey-text');
        calendarDates.appendChild(li);
    }
}
function displayPreviousMonth(){
    let currentMonth = sessionStorage.getItem('displayedMonth');
    let currentYear = sessionStorage.getItem('displayedYear');
    if (currentMonth == 0){
        currentMonth = 11;
        currentYear--;
    }else{
        currentMonth--;
    }
    console.log(`previous button clicked, populating previous month: ${months[currentMonth]} ${currentYear}`);
    sessionStorage.setItem('displayedMonth', currentMonth);
    sessionStorage.setItem('displayedYear', currentYear);
    populateCalendar(currentMonth, currentYear);
}

function displayNextMonth(){
    let currentMonth = sessionStorage.getItem('displayedMonth');
    let currentYear = sessionStorage.getItem('displayedYear');
    if (currentMonth == 11){
        currentMonth = 0;
        currentYear++;
    }else{
        currentMonth++;
    }
    console.log(`next button clicked, populating previous month: ${months[currentMonth]} ${currentYear}`);
    sessionStorage.setItem('displayedMonth', currentMonth);
    sessionStorage.setItem('displayedYear', currentYear);
    populateCalendar(currentMonth, currentYear);
}

function displayCurrentMonth(){
    console.log(`today button clicked: populating previous month: ${date.getMonth()} ${date.getFullYear()}`);
    populateCalendar(date.getMonth(), date.getFullYear());
}