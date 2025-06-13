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

    populateToDos(date){
        this.todos['3'] = [['grocery shop', false], ['drink lots of water', true]];
        let todos = this.todos[`${date}`];
        if (!todos){
            todos = []
        }
        let todoContainer = document.getElementById('todo-list');
       todoContainer.innerHTML = ''
       todos.sort((a,b) => a[1] - b[1]);
       todos.forEach((todo, index) => {
            const li = document.createElement('li');
        li.innerHTML = `
            <label class='todo-label'>
                <span>${todo[0]}</span>
                <input type="checkbox" class="checkbox" ${todo[1] ? 'checked' : ''}>
            </label>
        `;
            todoContainer.appendChild(li);
        });
    }

}