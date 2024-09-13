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
    { id: 1, title: 'Blog 1', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quaerat voluptates accusamus obcaecati, alias similique eveniet excepturi fugiat! Cum commodi inventore, delectus quas minima temporibus, placeat id accusantium nostrum vero cumque dolor sed veniam consectetur corrupti vitae ipsum voluptates quis maiores modi consequatur molestias aliquam! Maxime laudantium quisquam distinctio repudiandae enim nostrum quaerat iste eveniet numquam, veritatis optio magnam, corporis totam voluptate provident incidunt exercitationem dolorem esse reprehenderit in.\n Consequuntur consectetur voluptatem cumque optio repudiandae necessitatibus soluta saepe, commodi dolores nemo expedita, quibusdam molestias, dolor tempore nam eius odit harum repellendus excepturi ducimus autem? Quidem, ullam officiis, obcaecati delectus repellendus accusantium ab voluptatibus, ducimus dolorem facilis dolor illum!\n Sed tempora ea, veritatis omnis, natus deleniti aspernatur maiores eligendi ullam beatae fuga iste quam praesentium, distinctio deserunt! Omnis assumenda dolore odit animi nam, quaerat impedit vitae minima ratione eos recusandae aspernatur voluptas consectetur incidunt fugiat! Quod a sint, odit quae dolorum deleniti laboriosam facere voluptates unde fuga enim eos ducimus animi reprehenderit quam tempora illum. Consectetur atque ut, dolorem, ducimus quibusdam reiciendis quam deleniti quidem numquam minima doloremque accusantium, culpa vitae? Consequatur, rerum deserunt ullam tempora fugit omnis eius nulla vero rem libero accusantium nam distinctio tempore ex perferendis dicta aspernatur?' },
    { id: 2, title: 'Blog 2', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quaerat voluptates accusamus obcaecati, alias similique eveniet excepturi fugiat! Cum commodi inventore, delectus quas minima temporibus, placeat id accusantium nostrum vero cumque dolor sed veniam consectetur corrupti vitae ipsum voluptates quis maiores modi consequatur molestias aliquam! Maxime laudantium quisquam distinctio repudiandae enim nostrum quaerat iste eveniet numquam, veritatis optio magnam, corporis totam voluptate provident incidunt exercitationem dolorem esse reprehenderit in.\n Consequuntur consectetur voluptatem cumque optio repudiandae necessitatibus soluta saepe, commodi dolores nemo expedita, quibusdam molestias, dolor tempore nam eius odit harum repellendus excepturi ducimus autem? Quidem, ullam officiis, obcaecati delectus repellendus accusantium ab voluptatibus, ducimus dolorem facilis dolor illum!\n Sed tempora ea, veritatis omnis, natus deleniti aspernatur maiores eligendi ullam beatae fuga iste quam praesentium, distinctio deserunt! Omnis assumenda dolore odit animi nam, quaerat impedit vitae minima ratione eos recusandae aspernatur voluptas consectetur incidunt fugiat! Quod a sint, odit quae dolorum deleniti laboriosam facere voluptates unde fuga enim eos ducimus animi reprehenderit quam tempora illum. Consectetur atque ut, dolorem, ducimus quibusdam reiciendis quam deleniti quidem numquam minima doloremque accusantium, culpa vitae? Consequatur, rerum deserunt ullam tempora fugit omnis eius nulla vero rem libero accusantium nam distinctio tempore ex perferendis dicta aspernatur?' },
    { id: 3, title: 'Blog 3', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci quaerat voluptates accusamus obcaecati, alias similique eveniet excepturi fugiat! Cum commodi inventore, delectus quas minima temporibus, placeat id accusantium nostrum vero cumque dolor sed veniam consectetur corrupti vitae ipsum voluptates quis maiores modi consequatur molestias aliquam! Maxime laudantium quisquam distinctio repudiandae enim nostrum quaerat iste eveniet numquam, veritatis optio magnam, corporis totam voluptate provident incidunt exercitationem dolorem esse reprehenderit in.\n Consequuntur consectetur voluptatem cumque optio repudiandae necessitatibus soluta saepe, commodi dolores nemo expedita, quibusdam molestias, dolor tempore nam eius odit harum repellendus excepturi ducimus autem? Quidem, ullam officiis, obcaecati delectus repellendus accusantium ab voluptatibus, ducimus dolorem facilis dolor illum!\n Sed tempora ea, veritatis omnis, natus deleniti aspernatur maiores eligendi ullam beatae fuga iste quam praesentium, distinctio deserunt! Omnis assumenda dolore odit animi nam, quaerat impedit vitae minima ratione eos recusandae aspernatur voluptas consectetur incidunt fugiat! Quod a sint, odit quae dolorum deleniti laboriosam facere voluptates unde fuga enim eos ducimus animi reprehenderit quam tempora illum. Consectetur atque ut, dolorem, ducimus quibusdam reiciendis quam deleniti quidem numquam minima doloremque accusantium, culpa vitae? Consequatur, rerum deserunt ullam tempora fugit omnis eius nulla vero rem libero accusantium nam distinctio tempore ex perferendis dicta aspernatur?' }
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
