import React from 'react';
import { render, screen } from '@testing-library/react';
import  LineChart,{normalizeValues, findMinMax}  from './LineChart';
import { Line } from 'react-chartjs-2';

jest.mock("react-chartjs-2", () => ({
  Line: jest.fn(() => null), // Mock the Line component
}));

describe('LineChart component', () => {
  const mockGraphData = [
    {
      label: 'AAPL',
      data: [100, 110, 120],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'GOOGL',
      data: [200, 220, 240],
      borderColor: 'rgb(255, 198, 0)',
      backgroundColor: 'rgb(255, 198, 0)',
    },
  ];

  const mockDateRange = ['2023-01', '2023-02', '2023-03'];

  it('renders without errors', () => {
    render(<LineChart graphData={mockGraphData} dateRange={mockDateRange} />);
    
    const chartElement = screen.getByTestId('line-chart');
    expect(chartElement).toBeInTheDocument();
  });

  it('finds the minimum and maximum values correctly', () => {
    const values = [10, 5, 20, 15];
    const result = findMinMax(values);

    expect(result).toEqual({ min: 5, max: 20 });
  });


  it('normalizes the values within the range [0, 1]', () => {
    const mockData = {
      label: 'AAPL',
      data: [100, 110, 120],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
    };

    const normalizedData = normalizeValues(mockData);

    // You can test the properties of normalizedData here
    expect(normalizedData.label).toEqual(mockData.label);
    expect(normalizedData.borderColor).toEqual(mockData.borderColor);
    expect(normalizedData.backgroundColor).toEqual(mockData.backgroundColor);

    // Test the normalized data values
    const normalizedMin = 0;
    const normalizedMax = 1;
    const result = findMinMax(mockData.data);
    const expectedNormalizedData = mockData.data.map(
      (value: any) =>
        ((value - result.min) / (result.max - result.min)) * (normalizedMax - normalizedMin) +
        normalizedMin
    );
    expect(normalizedData.data).toEqual(expectedNormalizedData);
  });

  it("chart options are set correctly", () => {
    render(<LineChart graphData={mockGraphData} dateRange={mockDateRange} />);
    
    
    const lastCall = Line.mock.calls[Line.mock.calls.length - 1];
    const chartProps = lastCall[0]; // Extract the props passed to Line

    expect(chartProps.options).toEqual({
      responsive: true,
      scales: {
        y: {
          min: 0,
          max: 1,
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Line Chart",
        },
      },
    });
  });

});
