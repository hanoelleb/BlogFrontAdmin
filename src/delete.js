import React from 'react';
import { Redirect } from 'react-router-dom';


import * as ROUTES from './constants/routes';
import styles from './form.module.css';

class DeleteConfirm extends React.Component {
    constructor(props) {
        super(props);
	this.state = ({ deleted: false });
	this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
	var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';

        event.preventDefault();
	fetch(real + 'api/post/' + this.props.id + '/remove',
            {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then( response => response.json())
              .then( data => {
                  console.log(data.message);
		  this.setState({deleted: true });
            });

	//this.props.handler();

    }

    render() {
        if (this.state.deleted)
	    return < Redirect to={ROUTES.admin + ROUTES.blog} />
	return (
        <form className={styles.delete} onSubmit={this.handleSubmit}>
            <p>Are you sure want to delete this post?</p>
	    <button onClick={this.props.handler}>Cancel</button>
            <input type='submit' value='Delete'></input>
        </form>
	)
    }
}

export default DeleteConfirm;
