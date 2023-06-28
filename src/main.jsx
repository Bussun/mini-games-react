import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider, Outlet} from 'react-router-dom';

import TicTacToe from './games/TicTacToe';
import RockPaperScissors from './games/RockPaperScissors';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world</div>
  },
  {
    path: 'games',
    element: <div>Hello from games <Outlet /></div>,
    children: [
      {
        path: '',
        element: <div>Select the game you want to play in the menu</div>
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
    <RouterProvider router={router} />
  </React.StrictMode>,
)
