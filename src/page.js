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
	this.getUpdate = this.getUpdate.bind(this);
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
        fetch(real + 'api/post/' + this.props.location.state.id, 
	{
	    headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
	})
            .then( response => response.json() )
            .then( data => {
                this.setState({ post: data.post,
                    comments: data.comments, 
                    waiting: false});
            });

    }

    getUpdate() {
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';
        fetch(real + 'api/post/' + this.props.location.state.id,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then( response => response.json() )
            .then( data => {
                this.setState({post: data.post,
                    title: data.post.title,
                    content: data.post.content,
                    comments: data.comments,
                    edit: false });
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
		  handler={this.getUpdate}
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
	    <CommentThread comments={this.state.comments} 
		handler={this.getUpdate} id={this.state.id}/>
	</div>
	)
    }
}

class CommentThread extends React.Component {
     constructor(props) {
        super(props);
        this.state = ({openForm : false});
    }

    render() {
        const pid = this.props.id;
	const reloadhandler = this.props.handler;

        return (
          <div>
            <h2>Comments</h2>
            <div className='comments'>
            {this.props.comments.length > 0 ?
                 this.props.comments.map( function(comment, index) {
                      return (
			 <Comment comment={comment} key={index}
			      id={pid} 
			      handler={reloadhandler}/>
                      )
		 })
                 :
                 <h3>No comments on this post</h3>
            }
            </div>
          </div>
         )
    }
}

class Comment extends React.Component {
    constructor(props) {
         super(props);
	 this.handleDelete = this.handleDelete.bind(this);
	 this.state = ({openForm: false});
    }

    closeForm() {
        this.setState({openForm: false})
    }

    handleDelete() {
        this.setState({openForm: false});
	this.props.handler();
    }

    render() {
        return (
            <div className={styles.comment}>
                <h3>{this.props.comment.author}</h3>
                <p>{this.props.comment.content}</p>

                <button 
		   onClick={ ()=>{this.setState({openForm: true});} }>
		   Delete
		</button>
                
		{ this.state.openForm ?
		    <CommentForm id={this.props.id} 
		        cid={this.props.comment._id}
			handler={this.handleDelete}/>
                    :
                    null
		}
            </div>
	)}
}

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        var test = 'http://localhost:8080/';
        var real = 'https://hanoelleb-blog-api.herokuapp.com/';

        fetch(real + 'api/post/' + this.props.id + '/comment/' + this.props.cid + '/delete',
        {
            method: 'POST',
            headers: {
		'Authorization': localStorage.getItem('token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then( response => response.json() )
          .then( data => this.props.handler() )
    }

    render() {
        return (
          <form onSubmit={this.handleSubmit} className={styles.commentForm}>
              <p>Are you sure you want to delete this comment?</p>
              <button onClick={this.props.handler}>Cancel</button>
              <input type='submit' value='Delete comment'></input>
          </form>
        )
    }
}

export default Page;
