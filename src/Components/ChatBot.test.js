import React from 'react';
import { render, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChatBot from './ChatBot';
import axios from 'axios';

// Mocking the axios module to handle asynchronous API calls
jest.mock('axios');

describe('<ChatBot />', () => {

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('renders without crashing', () => {
    render(<ChatBot />);
  });

  it('displays AI introduction on initial render', async () => {
    axios.get.mockResolvedValueOnce({
      data: { output: 'Hello, I am Simpl, your AI assistant.' }
    });

    const { findByText } = render(<ChatBot />);
    const aiIntroMessage = await findByText('Hello, I am Simpl, your AI assistant.');

    expect(aiIntroMessage).toBeInTheDocument();
  });

  it('displays error message if API fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    const { findByText } = render(<ChatBot />);
    const errorMessage = await findByText('Oops... Something happened, try again');

    expect(errorMessage).toBeInTheDocument();
  });

  it('sends user input and displays AI response', async () => {
    const userInputText = 'How are you?';

    axios.get.mockResolvedValueOnce({
      data: { output: 'I am an AI, I don\'t have feelings but I am functioning properly.' }
    });

    const { getByPlaceholderText, getByText } = render(<ChatBot />);
    const input = getByPlaceholderText('Enter your message here...'); // Assuming you add a placeholder called "Enter your message here..." to your input.

    fireEvent.change(input, { target: { value: userInputText } });
    fireEvent.submit(input);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    // Optionally, check the parameters of the axios.get call
    // await waitFor(() => expect(axios.get).toHaveBeenCalledWith('YOUR_EXPECTED_API_ENDPOINT', { params: { userInput: userInputText } }));

    const aiResponse = await getByText('I am an AI, I don\'t have feelings but I am functioning properly.');
    expect(aiResponse).toBeInTheDocument();
  });

  // Test for checking the scrollIntoView function
  it('calls scrollIntoView when AI responds', async () => {
    const userInputText = 'How are you?';

    axios.get.mockResolvedValueOnce({
      data: { output: 'I am an AI, I don\'t have feelings but I am functioning properly.' }
    });

    // Mock scrollIntoView function
    window.HTMLElement.prototype.scrollIntoView = jest.fn();

    const { getByPlaceholderText } = render(<ChatBot />);
    const input = getByPlaceholderText('Enter your message here...');

    fireEvent.change(input, { target: { value: userInputText } });
    fireEvent.submit(input);

    await waitFor(() => expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled());
  });

  // Add more tests as required
});
