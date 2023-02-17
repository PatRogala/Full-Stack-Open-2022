const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: "me",
    url: "http://www.google.com",
    likes: 5
  },
  {
    title: 'CSS is easy',
    author: "me",
    url: "http://www.google.com",
    likes: 3
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'CSS is easy',
    author: "me",
    url: "http://www.google.com",
    likes: 3
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const bloges = await Blog.find({})
  return bloges.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}