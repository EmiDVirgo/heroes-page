import { fireEvent, getByRole, getByText, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../auth";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../ui/components/Navbar";

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate:() => mockedUseNavigate
}));


describe('Pruebas en el <Navbar />', () => { 

  const contextValue = {
    logged: true,
    user: {
      name: 'Emile',
      id: 'abc'
    },
    logout: jest.fn()
  }  
  beforeEach( () => jest.clearAllMocks() );
  

  test('debe de mostrar el nombre del usuario', () => { 
  
    
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect( screen.getByText('Emile') ).toBeTruthy();
   });

   test('debe de llamar el logout y navigate cuando se haceclick en el boton ', () => { 
    
    render(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn)


    expect( contextValue.logout ).toHaveBeenCalled();
    expect( mockedUseNavigate ).toHaveBeenCalledWith(  "/login", {"replace": true} );
    screen.debug();

    })
 })