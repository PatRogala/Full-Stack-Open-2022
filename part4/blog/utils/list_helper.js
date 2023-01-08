const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((favorite, blog) => {
        if (favorite.likes > blog.likes) {
            return favorite
        } else {
            return blog
        }
    }, {})
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authors = blogs.reduce((authors, blog) => {
        if (authors[blog.author]) {
            authors[blog.author] += 1
        } else {
            authors[blog.author] = 1
        }
        return authors
    }, {})

    const author = Object.keys(authors).reduce((author, currentAuthor) => {
        if (authors[author] > authors[currentAuthor]) {
            return author
        } else {
            return currentAuthor
        }
    })

    return {
        author,
        blogs: authors[author]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }

    const authors = blogs.reduce((authors, blog) => {
        if (authors[blog.author]) {
            authors[blog.author] += blog.likes
        } else {
            authors[blog.author] = blog.likes
        }
        return authors
    }, {})

    const author = Object.keys(authors).reduce((author, currentAuthor) => {
        if (authors[author] > authors[currentAuthor]) {
            return author
        } else {
            return currentAuthor
        }
    })

    return {
        author,
        likes: authors[author]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}