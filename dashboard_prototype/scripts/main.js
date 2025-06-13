import { MonthlyCalendar } from './calendar/MonthlyCalendar.js';
import { Calendar } from './calendar/Calendar.js';
import './utils/darkMode.js';

document.addEventListener('DOMContentLoaded', () => {
    const dateContainer = document.getElementById('calendar-dates');
    const headerContainer = document.getElementById('calendar-month-year');
    let date = new Date();
    let calendar = new Calendar(dateContainer, headerContainer);
    const storedCalendarData = localStorage.getItem('calendar');
    if (storedCalendarData){
        console.log('Locally stored calendar is found. Parsing data...')
        const parsedData = JSON.parse(storedCalendarData);
        calendar = Calendar.fromJSONToCalendar(parsedData, dateContainer, headerContainer);
        console.log('Retrieving existing calendar...\n', calendar);
    }
    else{
        console.log('Calendar does not exist in the local storage. Creating new calendar...')
        let calendarAsJSON = calendar.toJSON();
        localStorage.setItem('calendar', JSON.stringify(calendarAsJSON));
        console.log(`New calendar is created: \n ${calendar}`);
    }

    const sessionMonthlyCalendar = sessionStorage['renderedMonthlyCalendar'];
    let monthlyCalendar = new MonthlyCalendar(date.getFullYear(), date.getMonth());
    if(sessionMonthlyCalendar){
        console.log('Session Calendar is found. Parsing data...')
        const parsedSessionData = JSON.parse(sessionMonthlyCalendar)['monthlyCalendars'];
        monthlyCalendar = MonthlyCalendar.fromJSONtoMonthlyCalendar(parsedSessionData);
        console.log('Retrieving existing calendar...\n', monthlyCalendar);
    }
    calendar.populateCalendar(monthlyCalendar);

    const prevMonthBtn = document.getElementById('previous-month-btn');
    prevMonthBtn.addEventListener('click', () => {
        calendar.displayPreviousMonth();
    })

    const nextMonthBtn = document.getElementById('next-month-btn');
    nextMonthBtn.addEventListener('click', () => {
        calendar.displayNextMonth();
    })

    const currentBtn = document.getElementById('current-month-btn');
    currentBtn.addEventListener('click', () => {
        calendar.displayCurrentMonth();
    })
})