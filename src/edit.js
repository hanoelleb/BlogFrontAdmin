import React from 'react';
import styles from './form.module.css';

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = ({title: this.props.title, content: this.props.content});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
	event.preventDefault();
        const post = {
            title: this.state.title,
            content: this.state.content
	};

	var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
    
        fetch(real + 'api/post/' + this.props.id + '/edit',
            {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            }).then( response => response.json())
	      .then( data => {
		  console.log(data.message);
		  if (this.props.handler != null)
		      this.props.handler();
	    });
    }

    render() {
        return (
	    <form className={styles.edit} onSubmit={this.handleSubmit}>
                <button onClick={this.props.handler}>Cancel</button>
                <input type='text' name='title'
                    onChange={this.handleChange}
                    value = {this.state.title}
                    placeholder='Post title'>
                </input>

                <textarea rows='10' cols='40' name='content'
                    onChange={this.handleChange}
                    value = {this.state.content}
                    placeholder='Post content'>
                </textarea>

                <input type='submit' value='Update'></input>
            </form>
	)
    }
}

export default EditForm;
