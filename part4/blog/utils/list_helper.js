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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}