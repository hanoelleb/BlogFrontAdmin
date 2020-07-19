import React from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
	this.state = ({username: '', password: ''});
    }

    handleSubmit(event) {
        event.preventDefault();

	const message = {
	    username: this.state.username,
            password: this.state.password
	}

	const response =
            fetch('https://hanoelleb-blog-api.herokuapp.com/api/login', {
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
        this.setState({ [event.target.name] : event.target.value });
    }

    render() {
        return (
	<div>
            <form className={styles.form} onSubmit={this.handleSubmit}>
		<h2>Login</h2>
		<input type='text' placeholder='Username' name='username'
                    value={this.state.username} 
		    onChange={this.state.handleChange}
		>
		</input>

		<input type='password' placeholder='Password' name='password'
                    value={this.state.password}
		    onChange={this.state.handleChange}
		>
		</input>

		<input type='submit' value='Login'>
		</input>
            </form>		
	    <Link to='/register'>No account? Register</Link>
	</div>
	)
    }
}

export default LoginForm;
