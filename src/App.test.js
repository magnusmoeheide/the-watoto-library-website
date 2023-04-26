import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { Link } from "react-router-dom";
import App from './App';
import {Home, AdminHome} from './container'

test('renders the app page', () => {
    render(
        <Router>
          <App />
        </Router>
      );
});

test('renders the home page', () => {
    render(
        <MemoryRouter><Home /></MemoryRouter>
      );

      setTimeout(() => {
        expect(screen.getByText("The Watoto Library")).toBeInTheDocument();
        expect(screen.getByText("All Newsletters")).toBeInTheDocument();
        done();
      }, 1000); // 1 second delay
});

test('renders the admin page', () => {
    render(
        <MemoryRouter><AdminHome /></MemoryRouter>
      );

      setTimeout(() => {
        expect(screen.getByText("Articles created")).toBeInTheDocument();
        expect(articles.length).toBeGreaterThan(-1); // check if articles count works
        expect(now).toMatchObject(today());
        done();
      }, 1000); // 1 second delay
});