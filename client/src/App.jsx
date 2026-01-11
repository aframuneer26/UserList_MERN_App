
import './App.css'
import User from './GetUser/User'
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import Add from './AddUser/Add'
import UpdateUser from './UpdateUser/UpdateUser'



function App() {
  
    const router = createBrowserRouter([
    {
      path:"/",
      element: <User />,
    },
    {
      path:"/add",
      element: <Add />,
    },
    {
      path:"/update/:id",
      element: <UpdateUser />,
    }
  ]);
  return(
  <div className="App">
      <RouterProvider router={router}></RouterProvider>
  </div>
  )
}

export default App
