import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n';
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import './main.css';

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

ReactDOM.createRoot(document.querySelector('body')).render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
)
