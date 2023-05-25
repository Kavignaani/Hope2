const mongoose = require('mongoose');
const schema = mongoose.Schema;

const project_schema = new schema({
    project_ID :{
        type : String,
        required : true },
    project_name :{
        type : String,
        required : true },
    project_start_date :{
        type : String,
        required : true },
    est_end_date :{
        type : String,
        required : true },
    est_labour_cost : {
        type : Number,
        required : true },
    est_total_cost :{
        type : Number,
        required : true} , 
    cumulative_total_expense :{
        type : Number,
        default : 0 , 
        required : true}
},{timestamps :true});

const new_project = mongoose.model('project_list',project_schema);
module.exports = new_project;
