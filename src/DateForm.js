import React, { Component } from 'react';
import './DateForm.css';

class DateForm extends Component {
    constructor(props) {
        super(props);
        this.today = new Date();
        this.days = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday"
        };

        this.months = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        }
    }

    render() {
        return (
            <div className="date-form">
                <h1 className="day">{this.days[this.today.getDay()]}</h1>
                <p className="date">{this.months[this.today.getMonth()]} {('0' + this.today.getDate()).slice(-2)}, {this.today.getFullYear()}</p>
            </div>
        );
    }
}

export default DateForm;