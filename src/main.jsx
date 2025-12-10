import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import ViewStory from './ViewStory.jsx'
import Profile from './Profile.jsx'
import ViewProfile from './ViewProfile.jsx'
import AppProvider from './AppProvider.jsx'


const router=createBrowserRouter([
  {
    path:"/insta/",
    element:<App/>,

  },
  {
    path:'/insta/stories/:id/:tot',
    element:<ViewStory />
  },
  {
    path:'/insta/profile',
    element:<Profile></Profile>
  },
  {
    path:'/insta/viewProfile/:id',
    element:<ViewProfile/>
  }
])
function Follow(id) {
    const [user,setuser]=useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:8000/users/${id}`)
        .then(res=>setuser(res.data))
        .catch(err=>console.log(err))
    },[])
    function toggleFollow(targetId) {
    if (user.following.includes(targetId)) {
      console.log("Unfollowed");
    } else {
      console.log("Followed");
    }
    }}

createRoot(document.getElementById('root')).render(
  
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
)
