import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../auth/context/AuthContext"
import { AppRouter } from "../../router/AppRouter"

describe('Pruebas en el <AppRouter />', () => { 

  test('debe de mostrar el login si no esta autenticado', () => { 
    
    const contextValue = {
      logged: false,
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    expect( screen.getAllByText('Login').length ).toBe(2)
   })

   test('debe de mostrar el componente de marvel si esta autenticado', () => { 
    const contextValue = {
      logged: true,
      user: {
        id: '123',
        name: 'Emile Amparo'
      }
    }

    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    screen.debug();
    expect( screen.getByText('Marvel Page') ).toBeTruthy();
    
    expect( screen.getByText('Emile Amparo') ).toBeTruthy();
    })
 })