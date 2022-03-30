import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store'
import App from './App';
import PokemonCreate from './Components/PokemonCreate';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Inicia tu aventura/i);
  expect(linkElement).toBeInTheDocument();
});


describe("The form should have a name", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PokemonCreate></PokemonCreate>
        </BrowserRouter>
      </Provider>
    );
  });
  it("Should have a name", () => {
    const name = screen.getByLabelText("Name:");
    expect(name.type).toBe("text");
  });
});


