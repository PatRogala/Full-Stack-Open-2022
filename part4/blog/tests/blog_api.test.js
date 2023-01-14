const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
    })
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('there are two blog posts', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
})

test('blog has id property', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'me',
        url: 'e',
        likes: 9
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[2].title).toBe('async/await simplifies making async calls')
})

test('blog without likes property defaults to 0', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'me',
        url: 'e',
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[2].likes).toBe(0)
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'me',
        likes: 9,
        url: 'e'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('blog without url is not added', async () => {
    const newBlog = {
        author: 'me',
        likes: 9,
        title: 'e'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})