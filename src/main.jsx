import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n';
import {createBrowserRouter, RouterProvider, Outlet, Navigate} from 'react-router-dom';

import WelcomePage from './WelcomePage';
import TicTacToe from './games/TicTacToe';
import RockPaperScissors from './games/RockPaperScissors';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />
  },
  {
    path: 'games',
    children: [
      {
        path: '',
        element: <Navigate to='/' />
      },
      {
        path: 'tic-tac-toe',
        element: <TicTacToe />
      },
      {
        path: 'rock-paper-scissors',
        element: <RockPaperScissors />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
)
