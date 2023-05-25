const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blog_schema = new schema({
    title: {
        type : String,
        required : true
    },
    snippet:{
        type : Object,
        required : true
    },
    body:{
        type : String,
        required : true
    }
},{timestamps :true});

const Blog = mongoose.model('blogs',blog_schema);
module.exports = Blog;
// this Coll1 is the colection name. it will be seen as coll1s in the database. inside each collection(table) , there r documents(rows)