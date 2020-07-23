import React from 'react';
import { Redirect } from 'react-router-dom';
import styles from './blog.module.css';

class Blog extends React.Component {
    constructor(props) {
        super(props);
	this.state = ({token: localStorage.getItem('token'), 
	    waiting: true, posts: []});
    }

    componentDidMount() {
	var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
        fetch(real + 'api/posts')
	    .then( response => response.json() )
	    .then( data => { 
		this.setState({posts: data.posts.post_list, waiting: false});
	    });
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
		{ this.state.waiting ? '' : 
		    this.state.posts.map( post => 
                        < BlogPost post={post} />
		    )
		}
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

    handleSubmit(event) {
	event.preventDefault();
	const post = {
	    title: this.state.title,
	    content: this.state.content
	};
        var test = 'http://localhost:8080/';
	var real = 'https://hanoelleb-blog-api.herokuapp.com/';
	const response =
	    fetch(real + 'api/post/create',
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
		  }
	      );

	 this.props.handler();
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
        return (
	<div className={styles.blog}>
	    <h2>{this.props.post.title}</h2>
            <p>{this.props.post.content}</p>
	    <button>Edit</button>
	    <button>Remove</button>
	</div>
	)
    }
}

export default Blog;
