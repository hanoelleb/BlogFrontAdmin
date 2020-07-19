import React from 'react';
import styles from './form.module.css';

class LoginForm extends React.Component {
    render() {
        return (
            <form className={styles.form}>
		<h2>Login</h2>
		<input type='text' placeholder='Username'></input>
		<input type='password' placeholder='Password'></input>
		<input type='submit' value='Login'></input>
            </form>		   
	)
    }
}

export default LoginForm;
