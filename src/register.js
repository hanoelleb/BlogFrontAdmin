import React from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.handleChange = this.handleChange.bind(this);
	this.state = { username: '', password: '', pw_confirm: ''};
    }

    handleSubmit(event) {
        event.preventDefault();

        const message = { 
	    username: this.state.username, 
	    password: this.state.password 
	};

	const response = 
	    fetch('https://hanoelleb-blog-api.herokuapp.com/api/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)})
	        .then(response => response.json())
	        .then( data => {
	            console.log('message: ' + data.message);
	        });
    }

    handleChange(event) {
        this.setState({ [event.target.name] : event.target.value});
    }

    render() {
        var isInvalid = this.state.username === '' ||
		      this.state.password === '' ||
		      this.state.pw_confirm === '' ||
		      this.state.password !== this.state.pw_confirm;

        return (
	<div>
            <form className={styles.form} onSubmit={this.handleSubmit}>
                <h2>Register</h2>
                <input type='text' placeholder='Username' name='username'
		    onChange={this.handleChange} value={this.state.username}>
		</input>

                <input type='password' placeholder='Password' name='password'
		    onChange={this.handleChange} value={this.state.password}>
		</input>

		<input type='password' placeholder='Confirm Password'
		    name='pw_confirm' onChange={this.handleChange}
		    value={this.state.pw_confirm}>
		</input>

                <input type='submit' value='Submit' disabled={isInvalid}>
		</input>
            </form>
	    <Link to='/BlogFrontAdmin/'>Have an account?</Link>
	</div>
        )
    }
}

export default RegisterForm;

