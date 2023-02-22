const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = request.user

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }

  const blogModel = new Blog(blog)

  const savedBlog = await blogModel.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter
