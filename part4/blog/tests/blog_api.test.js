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

afterAll(() => {
    mongoose.connection.close()
})