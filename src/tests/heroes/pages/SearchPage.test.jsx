import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { SearchPage } from "../../../heroes/pages/SearchPage"


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate:() => mockedUseNavigate
}));

describe('Pruebas en <SearchPage />', () => { 
  beforeEach( () => jest.clearAllMocks() );
  
  test('debe de mostrarse correctamente con valores por defecto', () => { 

    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    )
  
    // screen.debug();
    expect( container ).toMatchSnapshot();
   });


   test('debe de mostrar a Batman y el input con el valor del queryString', () => { 

    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    )
  
    const input = screen.getByRole('textbox');
    expect( input.value ).toBe('batman');

    const img = screen.getByRole('img');
    const div = screen.getByLabelText('ElDiv');
      expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');
      expect( screen.getByLabelText('ElDiv') ).toBeTruthy();
      expect( div.style.display ).toBe('none')
    // screen.debug();
   });

   test('debe de mostrar un error si no se muestra el hero', () => { 

    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    )

    const div = screen.getByLabelText('ElDiv');

    // screen.debug();
    });

    test('debe de llamar el navigate a la pantalla nueva', () => { 

      const inputValue = 'superman';

      render(
        <MemoryRouter initialEntries={['/search?q=superman']}>
          <SearchPage />
        </MemoryRouter>
      )

      const input = screen.getByRole('textbox')
      fireEvent.change( input, { target: { name: 'seacrhText', value: inputValue}})

      const form = screen.getByRole('form');
      fireEvent.submit( form );

      expect( mockedUseNavigate ).toHaveBeenCalled();
      expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);
      
      


     })
 })