import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }


  const loginForm = () => (
    <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
  )

  const blogList = () => (
    <>
    <h2>blogs</h2>
    {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
    </>)

  return (
    <div>
      {user === null && loginForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App