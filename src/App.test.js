import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App'; // Import your App component

describe('ToDo List Application', () => {
  test('adds a new task when the Enter key is pressed', () => {
    render(<App />);
    const inputElement = screen.getByPlaceholderText('Add a new task');
    const taskText = 'Finish the report';

    // Simulate user typing into the input field
    fireEvent.change(inputElement, { target: { value: taskText } });

    // Simulate pressing the Enter key
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    // Check if the new task is added to the list
    expect(screen.getByText(taskText)).toBeInTheDocument();

    // Optionally, check if the input is cleared after adding the task
    expect(inputElement.value).toBe('');
  });
});
