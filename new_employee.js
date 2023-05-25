const mongoose = require('mongoose');
const schema = mongoose.Schema;

const emp_schema = new schema({
    emp_ID :{
        type : String,
        required : true },
    emp_name :{
        type : String,
        required : true },
    emp_dept :{
        type : String,
        required : true },
    emp_CTC : {
        type : Number,
        required : true }
},{timestamps :true});

const new_emp = mongoose.model('employee_list',emp_schema);
module.exports = new_emp;
