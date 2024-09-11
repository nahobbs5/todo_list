import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]); //array of To-do items.
  const [headingInput, setHeadingInput] = useState(''); //value entered by user. Empty initially
  const [listInputs, setListInputs] = useState({}); //empty object initially
  const handleAddTodo = () => { //Will be triggered on clicking the add heading button
    //If not empty, create new to-do object with heading and empty array for lists
    if (headingInput.trim() != '') { 
        /*If the condition in the if statement is met, this line updates the state variable todos. 
        It spreads the existing todos array (todos) into a new array using the spread syntax (…todos) 
        and appends a new object to it. The new object contains a heading property set to the 
        value of headingInput and a lists property initialized as an empty array.
        */
        setTodos([...todos, {heading: headingInput, lists: []}]);
        // Now the Clear headingInput state variable, resetting text input field
        setHeadingInput('');
    }
    // handleAddList function to add to-do items
    const handleAddList = (index) => {
        if (listInputs[index] && listInputs[index].trim() != '') {
            const newTodos = [...todos];
            newTodos[index].lists.push(listInputs[index]);
            setTodos(newTodos);
            setListInputs({...listInputs, [index]: ''});
        }
    };
    const handleListInputChange = (index, value) => {
        setListInputs({...listInputs, [index]: value});
    }
};
  return (
    <>
      <div className="todo-container">
        <h1 className="title">My Todo List</h1>
        <div className="input-container">
          <input
            type="text"
            className="heading-input"
            placeholder="Enter heading"
            value={headingInput} //bind value of input field to headingInput state
            onChange={(e) => {setHeadingInput(e.target.value);}} //Add onChange event handlet to update headingInput state
            
          />
          <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
        </div>
      </div>
      <div className="todo_main">
        {todos.map((todo, index) => (
            <div key={index} className='todo-card'>
                <div className='heading_todo'>
                    <ul>
                        {todo.lists.map((list, listIndex) => (
                            <li key={listIndex} className='todo_inside_list'>
                            <p>{list}</p>
                            </li>
                        ))}
                    </ul>
                    {/* // Add form in JSX */}
                    <div className='add_list'>
                        <input
                            type='text'
                            className='list-input'
                            placeholder='Add list'
                            value={listInputs[index] || ''}
                            onChange={(e) => handleListInputChange(index, e.target.value)}/>
                            <button className='add-list-button' onClick={() => handleAddList(index)}>Add List</button>
                    </div>

                    <h3>{todo.heading}</h3> {/* Display the heading here */}
                    <button className='delete-button-heading' onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
                </div>
            </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
