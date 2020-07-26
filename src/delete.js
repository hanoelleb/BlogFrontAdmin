import React from 'react';
import styles from './form.module.css';

class DeleteConfirm extends React.Component {
    constructor(props) {
        super(props);
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
	return (
        <form className={styles.delete}>
            <p>Are you sure want to delete this post?</p>
	    <button onClick={this.props.handler}>Cancel</button>
            <input type='submit' value='Delete'></input>
        </form>
	)
    }
}

export default DeleteConfirm;
