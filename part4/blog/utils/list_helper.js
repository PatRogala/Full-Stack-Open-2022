const dummy = (_blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors_blogs = {}
  blogs.forEach(blog => {
    if (authors_blogs[blog.author]) {
      authors_blogs[blog.author] += 1
    } else {
      authors_blogs[blog.author] = 1
    }
  })

  const maxBlogs = Math.max(...Object.values(authors_blogs))
  const author = Object.keys(authors_blogs).find(author => authors_blogs[author] === maxBlogs)
  return { author, blogs: maxBlogs }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authors_likes = {}
  blogs.forEach(blog => {
    if (authors_likes[blog.author]) {
      authors_likes[blog.author] += blog.likes
    } else {
      authors_likes[blog.author] = blog.likes
    }
  })

  const maxLikes = Math.max(...Object.values(authors_likes))
  const author = Object.keys(authors_likes).find(author => authors_likes[author] === maxLikes)
  return { author, likes: maxLikes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}