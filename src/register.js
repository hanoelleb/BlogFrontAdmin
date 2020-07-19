import React from 'react';
import { Link } from 'react-router-dom';
import styles from './form.module.css';

class RegisterForm extends React.Component {
    render() {
        return (
	<div>
            <form className={styles.form}>
                <h2>Register</h2>
                <input type='text' placeholder='Username'></input>
                <input type='password' placeholder='Password'></input>
		<input type='password' placeholder='Confirm Password'></input>
                <input type='submit' value='Submit'></input>
            </form>
	    <Link to='/'>Have an account?</Link>
	</div>
        )
    }
}

export default RegisterForm;

