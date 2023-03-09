import React, { Component } from 'react'
import './Task1.css'
export class Task1 extends Component {
    constructor(props) {
        super(props);
        this.state = 
        { 
            title: '',
            description: '',
            entries: [],
            editIndex: null,
            isEditMode: false,
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);   
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleUpdateClick = this.handleUpdateClick.bind(this);
    }
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    
    handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
    }
    
    handleAddClick(event) {
    event.preventDefault();
    const newEntry = { title: this.state.title, description: this.state.description };
    const newEntries = [...this.state.entries, newEntry];
    this.setState({ entries: newEntries, title: '', description: '' });
    }

    handleResetClick(event) {
    event.preventDefault();
    this.setState({ title: '', description: '' });
    }

    handleEditClick(index) {
        const entry = this.state.entries[index];
        this.setState({ title: entry.title, description: entry.description, editIndex: index, isEditMode: true });
    }
    
    handleUpdateClick(event) {
        event.preventDefault();
        const updatedEntry = { title: this.state.title, description: this.state.description };
        const updatedEntries = [...this.state.entries];
        updatedEntries[this.state.editIndex] = updatedEntry;
        this.setState({ entries: updatedEntries, title: '', description: '', isEditMode: false, editIndex: null });
    }
    
    handleDeleteClick(index) {
        const updatedEntries = [...this.state.entries];
        updatedEntries.splice(index, 1);
        this.setState({ entries: updatedEntries });
    }
    render() {
        const { title, description, entries, isEditMode } = this.state;
        return (
        <div className='task1-container'>
            <h1>Simple Todo List App</h1>
            <form onSubmit={isEditMode ? this.handleUpdateClick : this.handleAddClick}>
                <div className='title-container'>
                    <label htmlFor="title">Title</label><br />
                    <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={this.handleTitleChange}
                    required
                    />
                </div>
                <div className='description-container'>
                    <label htmlFor="description">Description</label><br />
                    <textarea
                    id="description"
                    value={description}
                    onChange={this.handleDescriptionChange}
                    required
                    />
                </div>
                <div className='btns'>
                    <button type="submit">
                        {isEditMode ? 'Update' : 'Add'}
                    </button>
                    <button type="button" onClick={this.handleResetClick}>
                    Reset
                    </button>
                </div>
            </form>
            <hr />
            <div className='todo-list'>
                {entries.map((entry, index) => (
                    <div key={index} className="task-body">
                        <strong>{entry.title}</strong>
                        <p>{entry.description}</p>
                        <div className="btns">
                            <button type="button" onClick={() => this.handleEditClick(index)}>
                                Edit
                            </button>
                            <button type="button" onClick={() => this.handleDeleteClick(index)}>
                                Delete
                            </button>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
        )
    }
}

export default Task1