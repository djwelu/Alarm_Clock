import React, {Component} from 'react';
import './App.css';
import AlarmTimes from './alarmTimes.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.alarm = new Audio('/airhorn.wav');
        this.alarm.loop = true;
        this.state = {
            displayTime: ' ',
            displayDay: ' ',
            upcomingTimes: []
        };
    };

    getDayString = (i) => {
        switch (i) {
            case 0:
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "rip";
        }
    };

    componentDidMount = async() => {
        let response = await fetch('http://localhost:8080/');
        let data = await response.json();
        setInterval(() => {
            let allUpcoming = [];
            for(let i=0; i<data.length; i++){
                let upcomingToDate = new Date();
                if(data[i].day!==upcomingToDate.getDay()||(data[i].timeHour>upcomingToDate.getHours())||
                    (data[i].timeHour===upcomingToDate.getHours()&& data[i].timeMin+1>upcomingToDate.getMinutes())) {
                    upcomingToDate.setDate(upcomingToDate.getDate()+(data[i].day+(7-upcomingToDate.getDay()))%7);
                }
                else{
                    upcomingToDate.setDate(upcomingToDate.getDate()+7);
                }
                upcomingToDate.setHours(data[i].timeHour,data[i].timeMin,0);
                allUpcoming.push(upcomingToDate);
            }
            let date = new Date();
            this.setState({
                displayDay: this.getDayString(date.getDay()),
                displayTime: date,
                upcomingTimes:allUpcoming
            })
        }, 1000)
    };

    getDifference = (compare) => {
        let dif = (compare.getTime() - this.state.displayTime.getTime())/1000;
        if(dif<=0.1&&dif>=-0.1){
            this.alarm.play();
        }
        console.log(this.alarm.paused);
        return dif;
    };

    render() {
        return (
            <div className="App">
                <div className="time">
                    {this.state.displayDay}
                    <br/>
                    {this.state.displayTime.toLocaleString()}
                </div>
                <div className="buttonAlign">
                    <button className="button" onClick={()=>this.alarm.pause()}>STOP</button>
                </div>
                <div className="alarms">
                    {this.state.upcomingTimes.map((i) =>
                        <AlarmTimes key={i} time={this.getDayString(i.getDay())+", "+i.toLocaleString()}
                                    secondsUntil ={this.getDifference(i)} />)}
                </div>
            </div>
        );
    }
}

export default App;
