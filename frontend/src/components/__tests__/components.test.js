import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MovieRecommender from '../MovieRecommender/MovieRecommender';
import Navbar from '../Navbar/Navbar';
import ScrollableSection from '../ScrollableSection/ScrollableSection';


afterEach(() => {
    cleanup();
})

describe('Footer Component', () => {
  it('Should render footer with correct text', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/movie recommender © 2024/i);
    expect(footerElement).toBeInTheDocument();
  });

  it('Should apply the correct class from styles', () => {
    const { container } = render(<Footer />);
    const footer = container.firstChild; 
    expect(footer).toHaveClass('footer');
  });
});

describe('Header Component', () => {
    it('Should render the header with navigation links', () => {
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
  
      expect(screen.getByText('Movie Recommender')).toBeInTheDocument();
      expect(screen.getByText('Home')).toBeInTheDocument();
    });
  
    it('Should show Recommended tab when user is logged in', () => {
      globalThis.userName = 'TestUser';
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
  
      expect(screen.getByText('Recommended')).toBeInTheDocument();
      expect(screen.getByText(`Hello, ${globalThis.userName}`)).toBeInTheDocument();
  
      globalThis.userName = undefined;
    });
  
    it('Should show Login/Register tab when user is not logged in', () => {
      globalThis.userName = null;
      render(
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      );
  
      expect(screen.getByText('Login/Register')).toBeInTheDocument();
      expect(screen.queryByText('Recommended')).toBeNull(); 
    });
});

describe('MovieRecommender Component', () => {
    it('Should render correctly with no movies', () => {
      render(<MovieRecommender movies={[]} />);
      expect(screen.queryByText('Movie')).toBeNull();  // Assuming "Movie" is part of movie card content
    });
  
    it('Should render correctly with movies', () => {
      const movies = [
        { id: 1, title: 'Movie 1', posterUrl: 'http://example.com/poster1.jpg', description: 'Description 1' },
        { id: 2, title: 'Movie 2', posterUrl: 'http://example.com/poster2.jpg', description: 'Description 2' }
      ];
      render(<MovieRecommender movies={movies} />);
      expect(screen.getByText('Movie 1')).toBeInTheDocument();
      expect(screen.getByText('Movie 2')).toBeInTheDocument();
    });
  });

describe('Navbar Component', () => {
    it('Should render a navigation link to the home page', () => {
      render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
  
      const homeLink = screen.getByText('Home');
      expect(homeLink).toBeInTheDocument();
  
      expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
  
    it('Should apply the correct class from styles', () => {
      const { container } = render(
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      );
  
      const navElement = container.querySelector('nav');
      expect(navElement).toHaveClass('navbar'); 
    });
});

describe('ScrollableSection Component', () => {
  it('Should render its children correctly', () => {
    const childText = 'This is a test child component';
    render(
      <ScrollableSection>
        <div>{childText}</div>
      </ScrollableSection>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();
  });

  it('Should apply the scrollable-section class', () => {
    const { container } = render(
      <ScrollableSection>
        <div>Test Scroll</div>
      </ScrollableSection>
    );

    const sectionDiv = container.firstChild;
    expect(sectionDiv).toHaveClass('scrollable-section');
  });
});
