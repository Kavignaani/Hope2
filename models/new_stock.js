const mongoose = require('mongoose');
const schema = mongoose.Schema;

const stock_schema = new schema({
    stock_name : {
        type : String,
        required : true },
    indate : {
        type : String,
        required : true },
    intime : {
        type : String,
        required : true },
    outdate : {
        type : String,
        required : true },
    outtime : {
        type : String,
        required : true },
    working : {
        type : Object,
        required : true },
    cost_for_project : {
        type : Object,
        required : true },
    work_total :{
        type : String,
        required : true },
    overtime : {
        type : String,
        required : true },
    overtime_amount : {
        type : Number,
        required : true
    }    
},{timestamps :true});

const worksheet = mongoose.model('worktime_sheet_list',work_schema);
module.exports = worksheet;
