import React from 'react';
import styles from './form.module.css';

class EditForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = ({title: '', content: ''});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
    }

    render() {
        return (
	    <form className={styles.edit} onSubmit={this.handleSubmit}>
                <button onClick={this.props.handler}>Cancel</button>
                <input type='text' name='title'
                    onChange={this.handleChange}
                    value = {this.state.title}
                    placeholder={this.props.title}>
                </input>

                <textarea rows='10' cols='40' name='content'
                    onChange={this.handleChange}
                    value = {this.state.content}
                    placeholder={this.props.content}>
                </textarea>

                <input type='submit' value='Update'></input>
            </form>
	)
    }
}

export default EditForm;
