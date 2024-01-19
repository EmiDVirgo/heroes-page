import { render, screen } from "@testing-library/react"
import { AuthContext } from "../../auth/context/AuthContext"
import { PrivateRoute } from "../../router/PrivateRoute"
import { MemoryRouter } from "react-router-dom"

describe('Pruebas en el <PrivateRoute />', () => { 
  

  test('debe de mostrar el children si esta autenticado', () => { 

    Storage.prototype.setItem = jest.fn();
    
    const contextValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'Victorino'
      }
    }

    render(
      <AuthContext.Provider value={ contextValue }>
      <MemoryRouter initialEntries={['search?=batman']}>
      <PrivateRoute>
          <h1>Ruta Privada</h1>
        </PrivateRoute>
      </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Ruta Privada')).toBeTruthy();
    expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "search?=batman");
   })
 })