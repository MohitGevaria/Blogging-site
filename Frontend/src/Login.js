import * as React from 'react'
import { useCallback } from 'react'
import { Navigate, Redirect, useLocation } from 'react-router-dom'

import { useKeycloak } from '@react-keycloak/web'

const Login = () => {
  const location = useLocation()
  const currentLocationState = location.state || {
    from: { pathname: '/home' },
  }

  const { keycloak } = useKeycloak()

  const login = useCallback(() => {
    keycloak?.login()
  }, [keycloak])

  if (keycloak?.authenticated)
    return <Navigate to={currentLocationState?.from } />

  return (
    <div>
      <button type="button" onClick={login}>
        Login
      </button>
    </div>
  )
}

export default Login