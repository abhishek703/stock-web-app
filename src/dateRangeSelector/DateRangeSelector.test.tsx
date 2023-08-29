import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DateRangeLabelGenerator from './DateRangeSelector';

describe('DateRangeLabelGenerator component', () => {
  it('renders without errors', () => {
    render(<DateRangeLabelGenerator datePicker={() => {}} />);
    
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    const selectDatesButton = screen.getByText('select Dates');

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
    expect(selectDatesButton).toBeInTheDocument();
  });

  it('generates labels correctly when dates are selected', async () => {
    const mockDatePicker = jest.fn();
    render(<DateRangeLabelGenerator datePicker={mockDatePicker} />);
    
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    const selectDatesButton = screen.getByText('select Dates');

    // Set start and end dates
    userEvent.type(startDateInput, '2023-01-01');
    userEvent.type(endDateInput, '2023-03-01');

    // Click the 'select Dates' button
    fireEvent.click(selectDatesButton);

    // Check if the generated labels are correct
    expect(mockDatePicker).toHaveBeenCalledWith(['2023-01', '2023-02', '2023-03']);
  });

  it('does not generate labels when end date is before start date', async () => {
    const mockDatePicker = jest.fn();
    render(<DateRangeLabelGenerator datePicker={mockDatePicker} />);
    
    const startDateInput = screen.getByLabelText('Start Date');
    const endDateInput = screen.getByLabelText('End Date');
    const selectDatesButton = screen.getByText('select Dates');

    // Set end date before start date
     userEvent.type(startDateInput, '2023-03-01');
     userEvent.type(endDateInput, '2023-01-01');

    // Click the 'select Dates' button
    fireEvent.click(selectDatesButton);

    // Check if the generated labels are empty
    expect(mockDatePicker).toHaveBeenCalledWith([]);
  });
});
