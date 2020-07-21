import React from 'react';
import { Redirect } from 'react-router-dom';

class Blog extends React.Component {
    constructor(props) {
        super(props);
	this.state = ({token: localStorage.getItem('token')});
    }

    render() {
	console.log(this.state.token);
	if (this.state.token === '') {
	    return < Redirect to='/' />
	}
        return (
	    <div>
		<h2>Blog</h2>
		<Dashboard />
            </div>
	)
    }
}

class Dashboard extends React.Component {
    render() {
        return (
	    <div>
		< PostButton />
		<button>Drafts</button>
            </div>
	)
    }
}

class PostButton extends React.Component {
    constructor(props) {
        super(props);
	this.handler = this.handler.bind(this);
	this.openForm = this.openForm.bind(this);
	this.state = ({formOpen: false});
    }

    handler() {
        this.setState({formOpen: false});
    }

    openForm() {
        this.setState({formOpen: true});
    }

    render() {
        return (
            <div>
	        <button onClick={this.openForm}>New Post</button>
		{ this.state.formOpen ? 
		    <PostForm handler={this.handler} /> : null }
            </div>
	)
    }
}

class PostForm extends React.Component {
    constructor(props) {
        super(props);
	this.handleChange = this.handleChange.bind(this);
	this.handleSave = this.handleSave.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.state = ({title: '', content: ''});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSave() {
    }

    handleSubmit() {
    }

    render() {
        return (
	    <form onSubmit={this.handleSubmit}>
		<button onClick={this.props.handler}>Cancel</button>
                <input type='text' name='title' 
                    onChange={this.handleChange}
		    value = {this.state.title}
		    placeholder='Post Title'>
		</input>

		<textarea rows='10' cols='40' name='content' 
		    onChange={this.handleChange}
		    value = {this.state.content}
		    placeholder='Post content'>
		</textarea>

		<button>Save</button>
		<input type='submit' value='Post'></input>
            </form>
	)
    }
}

class BlogPost extends React.Component {
    render() {
        return (<h3>Hello</h3>)
    }
}

export default Blog;
