const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('getting blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('adding blogs', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 5
    }

    await api.post('/api/blogs').send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'Blog without likes',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html'
    }

    await api.post('/api/blogs').send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)

    expect(addedBlog.likes).toBe(0)
  })

  test('if the title is missing responds with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 5
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })

  test('if the url is missing responds with 400 Bad Request', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      title: 'async/await simplifies making async calls',
      likes: 5
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
  })
})

describe('deleting blogs', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating blogs', () => {
  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1
    }

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    expect(updatedBlogInDb.likes).toBe(updatedBlog.likes)
  })
})
    

afterAll(async () => {
  await mongoose.connection.close()
})