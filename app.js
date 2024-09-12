const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serves static files from the 'public' directory
app.set('view engine', 'ejs');

// Sample data (prewritten blogs)
let blogs = [
    { id: 1, title: 'Blog 1', content: 'This is the first blog.' },
    { id: 2, title: 'Blog 2', content: 'This is the second blog.' },
    { id: 3, title: 'Blog 3', content: 'This is the third blog.' }
];

// List of available images
const images = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
    '/images/image7.jpg',
    '/images/image8.jpg',
    '/images/image9.jpg',
];

// Assign a random image to each blog post
const assignRandomImages = (blogs) => {
    return blogs.map(blog => {
        return {
            ...blog,
            image: images[Math.floor(Math.random() * images.length)]
        };
    });
};

// Routes
app.get('/', (req, res) => {
    const blogsWithImages = assignRandomImages(blogs);
    console.log('Blogs with images:', blogsWithImages); // Debugging line to check images
    res.render('index', { blogs: blogsWithImages });
});

app.get('/blog/:id', (req, res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (blog) {
        res.render('blog-detail', { blog });
    } else {
        res.status(404).send('Blog not found');
    }
});

app.get('/add-blog', (req, res) => {
    res.render('add-blog');
});

app.post('/add-blog', (req, res) => {
    const { title, content } = req.body;
    const newBlog = {
        id: blogs.length + 1,
        title,
        content
    };
    blogs.push(newBlog);
    res.redirect('/');
});

app.get('/edit-blog/:id', (req, res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if (blog) {
        res.render('edit-blog', { blog });
    } else {
        res.status(404).send('Blog not found');
    }
});

app.post('/edit-blog/:id', (req, res) => {
    const { title, content } = req.body;
    const blogIndex = blogs.findIndex(b => b.id === parseInt(req.params.id));
    if (blogIndex !== -1) {
        blogs[blogIndex] = { id: parseInt(req.params.id), title, content };
        res.redirect('/');
    } else {
        res.status(404).send('Blog not found');
    }
});

app.post('/delete-blog/:id', (req, res) => {
    blogs = blogs.filter(blog => blog.id !== parseInt(req.params.id));
    res.redirect('/');
});

// Route for the About Us page
app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
