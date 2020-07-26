import React from 'react';
import { Link } from 'react-router-dom';

import EditForm from './edit';
import DeleteConfirm from './delete';

import styles from './blog.module.css';

import * as ROUTES from './constants/routes';

class Page extends React.Component {
    constructor(props) {
        super(props);
	this.closeEdit = this.closeEdit.bind(this);
	this.closeRemove =  this.closeRemove.bind(this);
	this.state = ({waiting: true, edit: false, remove: false,
	    title: '', content: '', id: ''
	});
    }

    componentDidMount() {
        if (this.props.location.state.title != null)
	    this.setState({title: this.props.location.state.title});

	if (this.props.location.state.content != null)
            this.setState({content: this.props.location.state.content});

	if (this.props.location.state.id != null)
            this.setState({id: this.props.location.state.id});

        var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
        fetch(test + 'api/post/' + this.props.location.state.id, 
	{
	    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
	})
            .then( response => response.json() )
            .then( data => {
		console.log('data: ' + data);
                this.setState({post: data.post, 
                    comments: data.comments, 
                    waiting: false});
            });

    }

    closeEdit() {
        this.setState({edit: false});
    }

    closeRemove() {
        this.setState({remove: false});
    }

    render() {
	if (this.state.waiting)
	    return <h2>Loading...</h2>
        return (
	<div>
	    <Link to={ROUTES.admin + ROUTES.blog} >View all posts</Link>
	    <div className={styles.blog}>
	        <h2>{this.state.title}</h2>
                <p>{this.state.content}</p>

                <button onClick={() => { this.setState({edit: true}) } }>
		    Edit
		</button>

                <button onClick={() => { this.setState({remove: true}) } }>
                    Remove
                </button>
                
		{ this.state.edit ? 
		< EditForm handler={this.closeEdit}
                  title={this.state.title}
		  content={this.state.content}
                  id={this.state.id}
		/>
                  :
		  null
		}

		{ this.state.remove ?
		    < DeleteConfirm handler={this.closeRemove} 
                      id={this.state.id}
                    />
                  :
                  null
                }
            </div>
	    <CommentThread />
	</div>
	)
    }
}

class CommentThread extends React.Component {
    render() {
        return <h3>Comments</h3>
    }
}

export default Page;
