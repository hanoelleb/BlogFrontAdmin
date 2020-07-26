import React from 'react';
import { Link } from 'react-router-dom';
import styles from './blog.module.css';

import * as ROUTES from './constants/routes';

class Page extends React.Component {
    render() {
        return (
	<div>
	    <Link to={ROUTES.admin + ROUTES.blog} >View all posts</Link>
	    <div className={styles.blog}>
	        <h2>{this.props.location.state.title}</h2>
                <p>{this.props.location.state.content}</p>
                <button>Edit</button>
                <button>Remove</button>
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
