import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'; 

export default class CreateFood extends Component {
    constructor(props)
    {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeMeal = this.onChangeDuration.bind(this);
        this.onChangeDate  = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeCalories = this.onChangeCalories.bind(this);
        this.state = {
            username : '',
            description: '',
            meal: '',
            date: new Date(),
            calories: 0,
            users: []
        }
    }   
    componentDidMount()
    {
        axios.get('http://localhost:5000/users/')
        .then(response => {
            if (response.data.length > 0) {
                this.setState({
                    users: response.data.map(user => user.username),
                    username: response.data[0].username
                })
            }
        })
        
    }
    onChangeUsername(e)
    {
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription(e)
    {
        this.setState({
            description: e.target.value
        });
    }
    onChangeCalories(e)
    {
        this.setState({
            calories: e.target.value
        });
    }
    onChangeDuration(e)
    {
        this.setState({
            meal : e.target.value
        });
    }
    onChangeDate(date)
    {
        this.setState({
            date: date
        });
    }
    onSubmit(e){
        e.preventDefault();
        const food = {
            username : this.state.username,
            description: this.state.description,
            meal: this.state.meal,
            date: this.state.date,
            calories: this.state.calories
        }
        console.log(food)
        axios.post('http://localhost:5000/foods/add', food)
        .then(res => console.log(res.data));
            window.location ="/"
    }
    render()
    {
        return (
            <div>
                <h3>Create New Food Journal Entry</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <select ref = "userInput"
                        required
                        className = "form-control"
                        value = {this.state.username}
                        onChange = {this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                return <option 
                                key = {user}
                                value = {user}>{user}
                                </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className = "form-group">
                        <label>Description: </label>
                        <textarea type = "text"
                        required
                        className = "form-control"
                        value = {this.state.description}
                        onChange = {this.onChangeDescription}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Meal Type </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.duration}
                        onChange = {this.onChangeDuration}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Calories: </label>
                        <input type = "text"
                        required
                        className = "form-control"
                        value = {this.state.calories}
                        onChange = {this.onChangeCalories}
                        />
                    </div>
                    <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          
          </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Create Meal Log" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}