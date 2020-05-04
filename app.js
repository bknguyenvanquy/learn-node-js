const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('5ea20280fae10e7234327d85')
    // User.findById('5eafc3adbd1ef034300b1c3d') // using in company
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://quynv:6zurPnETrXPqKMaT@cluster0-czzjt.mongodb.net/shop?retryWrites=true&w=majority', 
// mongoose.connect('mongodb://127.0.0.1:27017/shop', // using in company
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(result => {
    User.findOne()
    .then(user => {
        if(!user) {
            const user = new User({
                name: 'QuyNV',
                email: 'admin@gmail.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    })
    app.listen(3000);
})
.catch(err => console.log(err));