import { MONTHS, TOTAL_DATE_CT } from '../utils/constants.js';
import { MonthlyCalendar } from './MonthlyCalendar.js';
export class Calendar{
    constructor(dateContainer, headerContainer){
        this.monthlyCalendars = [];
        this.dateContainer = dateContainer;
        this.headerContainer = headerContainer;
    }

    toJSON(){
        const calendar = []
        this.monthlyCalendars.forEach((monthlyCalendar) => {
            calendar.push(
                {
                    year: monthlyCalendar.year,
                    month: monthlyCalendar.month,
                    todos: monthlyCalendar.todos,
                    events: monthlyCalendar.events
                }
            )
        })
        return {
            monthlyCalendars: calendar
        };
    }

    static fromJSONToCalendar(data, dateContainer, headerContainer)
    {
        const calendar = new Calendar(dateContainer, headerContainer);
        const calendarObjList = [];
        (data.monthlyCalendars).forEach((item) => {
            const monthlycalendarObj = new MonthlyCalendar(item.year, item.month);
            monthlycalendarObj.todos = item.todos;
            monthlycalendarObj.events = item.events;
            calendarObjList.push(
                monthlycalendarObj
            )
        });
        calendar.monthlyCalendars = calendarObjList
        return calendar;
    }

    populateCalendar(monthlyCalendar){
        const month = monthlyCalendar.month;
        const year = monthlyCalendar.year;
        this.populateHeader(month, year);
        this.populateDates(month,year);
        if(!this.checkIfInLocalStorage(month,year)){
            this.monthlyCalendars.push(monthlyCalendar);
            let calendarAsJSON = this.toJSON();
            localStorage.setItem('calendar', JSON.stringify(calendarAsJSON));
        }
        this.markToday(month,year);
        //this.populateTodos(month, year);
        //this.populateEvents(month, year);
        let monthlycalendarAsJSON = monthlyCalendar.toJSON();
        sessionStorage.setItem('renderedMonthlyCalendar', JSON.stringify(monthlycalendarAsJSON));
    };

    markToday(month, year){
        const date = new Date();
        if (month == date.getMonth() && year == date.getFullYear()){
            const today = date.getDate();
            const todayItem = this.dateContainer.getElementsByClassName(`${today}`)[0];
            todayItem.classList.add('today-date');
        }
    }

    populateHeader(month, year){
        this.headerContainer.innerHTML = `<span>${year}</span><span>${MONTHS[month]}</span>`;
    }

    populateDates(month, year){
        this.dateContainer.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay(); //returns Sunday - Saturday index : 0 - 6
        const lastDate = new Date(year, month+1, 0).getDate(); 
        const lastDay = new Date(year, month+1, 0).getDay();
        
        let dateFromLastMonth = new Date(year, month,1-firstDay).getDate(); 
        for(let i = 0; i < firstDay; i++){
            const li = document.createElement('li');
            li.textContent = `${dateFromLastMonth++}`;
            li.classList.add('calendar-date', 'calendar-item', 'grey-text');
            this.dateContainer.appendChild(li);
        }
        
        for(let i = 1; i <= lastDate; i++)
        {
            let li = document.createElement('li');
            li.classList.add('calendar-date', 'calendar-item', `${i}`);
            li.textContent = `${i}`;
            this.dateContainer.appendChild(li)
        }
    
        const calendarDateContainer = document.getElementsByClassName('calendar-dates')[0];
        let numDatesLeft = TOTAL_DATE_CT - this.dateContainer.getElementsByTagName('li').length;
        for(let i = 1; i <= numDatesLeft; i++)
        {
            const li = document.createElement('li');
            li.textContent = `${i}`;
            li.classList.add('calendar-date', 'calendar-item', 'grey-text');
            this.dateContainer.appendChild(li);
        };
    }

    displayPreviousMonth(){
        const data = this.retrieveSessionData()
        let month = data['month'];
        let year = data['year'];
        if (month == 0){
            month = 11;
            year--;
        }else{
            month--;
        }
        console.log(`previous button clicked, populating previous month: ${MONTHS[month]} ${year}`);
        const newMonthlyCalendar = new MonthlyCalendar(year, month);
        this.populateCalendar(newMonthlyCalendar);
    }
    
    displayNextMonth(){
        const data = this.retrieveSessionData()
        let month = data['month'];
        let year = data['year'];
        if (month == 11){
            month = 0;
            year++;
        }else{
            month++;
        }
        console.log(`next button clicked, populating previous month: ${MONTHS[month]} ${year}`);
        const newMonthlyCalendar = new MonthlyCalendar(year, month);
        this.populateCalendar(newMonthlyCalendar);
    }
    
    displayCurrentMonth(){
        const date = new Date();
        console.log(`today button clicked: populating previous month: ${date.getMonth()} ${date.getFullYear()}`);
        const currentMonthlyCalendar = new MonthlyCalendar(date.getFullYear(), date.getMonth());
        this.populateCalendar(currentMonthlyCalendar);
    }

    retrieveSessionData(){
        const sessionMonthlyCalendar = sessionStorage['renderedMonthlyCalendar'];
        const parsedSessionData = JSON.parse(sessionMonthlyCalendar)['monthlyCalendars'];
        console.log(parsedSessionData);
        let month = parsedSessionData.month;
        let year = parsedSessionData.year;
        return {
            'month': month,
            'year': year
        };
    }

    checkIfInLocalStorage(month, year){
        this.monthlyCalendars.forEach((item) => {
            if(item.year == year && item.month == month){
                return true;
            }
        })
        return false;
    }

    //TO DOS:
    //populateTodoDots()
    //populateEventDots()
    //getMonthlyCalendar(month, year)
    //
}