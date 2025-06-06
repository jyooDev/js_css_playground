export class MonthlyCalendar{
    constructor(year, month){
        this.year = year,
        this.month = month,
        this.todos = {}
        this.events = {}
    }

    toJSON(){
        return {
            monthlyCalendars: {
                    year: this.year,
                    month: this.month,
                    todos: this.todos,
                    events: this.events
                }
        };
    }

    static fromJSONtoMonthlyCalendar(data){
        let monthlyCalendar = new MonthlyCalendar(data.year, data.month);
        monthlyCalendar.todos = data.todos;
        monthlyCalendar.events = data.events;
        return monthlyCalendar;
    }
}