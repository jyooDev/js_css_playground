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
        let monthlycalendarAsJSON = monthlyCalendar.toJSON();
        sessionStorage.setItem('renderedMonthlyCalendar', JSON.stringify(monthlycalendarAsJSON));
        this.populateHeader(month, year);
        this.populateDates(month,year);
        this.storeLocally(month,year);
        this.markToday(month,year);
        //this.populateTodos(month, year);
        //this.populateEvents(month, year);
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
            li.classList.add('calendar-item', 'grey-text');
            this.dateContainer.appendChild(li);
        }
        
        for(let date = 1; date <= lastDate; date++)
        {
            let li = document.createElement('li');
            li.classList.add('calendar-date', 'calendar-item', `${date}`);
            li.textContent = `${date}`;
            this.dateContainer.appendChild(li)
            li.addEventListener('click', () => {
                console.log(`Date ${date} is clicked.`);
                const sessionMonthlyCalendar = sessionStorage['renderedMonthlyCalendar'];
                const parsedSessionData = JSON.parse(sessionMonthlyCalendar)['monthlyCalendars'];
                const monthlyCalendar = MonthlyCalendar.fromJSONtoMonthlyCalendar(parsedSessionData);
                monthlyCalendar.populateToDos(date);
            })
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
        console.log(`previous button clicked: ${MONTHS[month]} ${year}`);
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
        console.log(`next button clicked: ${MONTHS[month]} ${year}`);
        const newMonthlyCalendar = new MonthlyCalendar(year, month);
        this.populateCalendar(newMonthlyCalendar);
    }
    
    displayCurrentMonth(){
        const date = new Date();
        console.log(`today button clicked: ${date.getMonth()} ${date.getFullYear()}`);
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

    storeLocally(month, year){            
        const isStored = (c) => c.month == month && c.year == year;
        if(!this.monthlyCalendars.some(isStored))
        {
            console.log("Rendered calendar is not stored in your local storage.");
            const mCalendar = new MonthlyCalendar(year, month);
            this.monthlyCalendars.push(mCalendar);
            let calendarAsJSON = this.toJSON();
            localStorage.setItem('calendar', JSON.stringify(calendarAsJSON));
        }
    }

    //TO DOS:
    //populateTodoDots()
    //populateEventDots()
    //getMonthlyCalendar(month, year)
    //
}