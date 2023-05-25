const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const blog_schema = require('./models/Blog')
const project_schema=require('./models/new_project');
const work_schema=require('./models/worktime_sheet');
const emp_schema=require('./models/new_employee');
const { title } = require('process');
const { db } = require('./models/new_project');
const app = express()
const { Parser } = require('json2csv');
const { resourceLimits } = require('worker_threads');


mongoose.set('strictQuery',false)
const URL = 'mongodb+srv://Kavignaani:STE952R@cluster0.dp6plma.mongodb.net/FabHeads'
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=> {
        console.log('connected')
    })
    .catch((err)=> console.log(err))
app.set('view engine','ejs')

app.use(express.static('public'))
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true}))
app.listen(1500)

  
app.get('/add-det',(req , res)=> {
    const insta = new blog_schema({
        title : 'Trial 2',
        snippet : 'Wil this work 2',
        body : 'Yeah this works 2'
    })
    insta.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err)=> {
            console.log(err)
        })
})
app.get('/all-det',(req , res)=> {
    blog_schema.find()
        .then((result) => {
        res.send(result)
    })
        .catch((err)=> {
        console.log(err)
    })
})

app.get('/' , (req , res) => {
    res.render('Home' , {title : "Home"})})

app.get('/WTS' , (req , res) => {
    res.render('WTS' , {title : "WorkTime"})})
app.get('/WTS/Trial' , (req , res) => {
    res.render('WTS_Trial' , {title : "Trial"})})
app.get('/WTS/AML' , (req , res) => {
    emp_schema.find()
    .then((result1)=> {
        project_schema.find()
        .then((result2) =>{
            res.render('WTS_AML',{title : 'AM Labs' , emps : result1 , projects : result2})})})})
app.get('/WTS/Prod' , (req , res) => {
    emp_schema.find()
    .then((result1)=> {
        project_schema.find()
        .then((result2) =>{
            res.render('WTS_Prod',{title : 'Production' , emps : result1 , projects : result2})})})})

            app.get('/Inv' , (req , res) => {
    res.render('Inventory' , {title : "Inventory"})})
app.get('/Inv/Outflow' , (req , res) => {
    project_schema.find()
    .then((projects)=> {
        res.render('Inv_Outflow' , {title : "Stocks Outflow" , projects : projects})})})    
app.get('/Inv/Inflow' , (req , res) => {
    project_schema.find()
    .then((projects)=> {
        res.render('Inv_Inflow' , {title : "Stocks Inflow" , projects : projects})})})    


app.get('/BDS' , (req , res) => {
    project_schema.find()
    .then((result)=>{
        let csv = ''
        result.forEach(projects => {
            csv=csv+projects.project_ID
        }
        )
        console.log(csv)

        
        res.render('BDS' , {title : "BD Services" , projects : result })})})
app.get('/Fin' , (req , res) => {
    emp_schema.find()
    .then((result1)=> {
        work_schema.find()
        .then((result2) =>{
    res.render('Fin' , {title : "Finance" , emplist : result1 , otdata : result2})})})})
app.get('/Ops' , (req , res) => {
    project_schema.find()
    .then((result1) => {
        work_schema.find()
        .then((result2) =>{
            res.render('Ops' , {title : "Operations" , viewover : result1 , worksheet : result2})})})})
                    

app.post('/worktime' , (req , res)=> {
    const data=req.body
    x=[data.hr0,data.hr1,data.hr2,data.hr3,data.hr4,data.hr5,data.hr6,data.hr7,data.hr8,data.hr9,data.hr10,data.hr11,data.hr12,data.hr13,data.hr14,data.hr15,data.hr16,data.hr17,data.hr18,data.hr19,data.hr20,data.hr21,data.hr22,data.hr23]
    y=[]
    let data_emp_ID = data.emp_ID
    var required_CTC = 0
    emp_schema.find()
    .then((result1)=> {
        result1.forEach ( employee =>{
            if (data_emp_ID == employee.emp_ID){
                required_CTC = employee.emp_CTC

                    var project_costing={}
                x.forEach( xdata => {
                    if (xdata == 'None' ||  xdata == 'Benched'){
                        project_costing[xdata] = 0
                    } else {
                        project_costing[xdata]=required_CTC/(24*8)
                        project_schema.find()
                        .then((result2) => { 
                            console.log(result2)
                            result2.forEach ( projects =>{
                        if (projects.project_ID ==  xdata) {
                            x=projects.cumulative_total_expense
                            console.log('INITIAL',x)
                                y=x+required_CTC/(24*8)
                            console.log('FINAL',y)
                                console.log(projects.id)
                                str='ObjectId('+projects.id+')'
                                console.log(str)


                                project_schema.findByIdAndUpdate(projects.id, {$set:{cumulative_total_expense : y} })
                                .then((resultx)=> {

                                // db.project_schema.findBy({_id : str} , {$set:{cumulative_total_expense : y} })
                        console.log("CROSSED THIS PLACE")

        let inhr=parseInt(data.intime.slice(0,2))
        let inmin=parseInt(data.intime.slice(3))
        let outhr=parseInt(data.outtime.slice(0,2))
        let outmin=parseInt(data.outtime.slice(3))
        
        var night = 0
        if (outhr<inhr){
            var night=1
        }
        
        let total = 0
        let duration = 0
        let hrs=0
        let OTTotal=''
        let OTAmount=0
        if (night==1){
            hrs = 24+(outhr-inhr)
        } else {
            hrs = outhr-inhr
        }
        if (inmin>outmin){
            hrs=hrs-1
            duration = hrs*60 + 60-(inmin-outmin)
        } else {
            duration = hrs*60 + outmin-inmin
        }
        let workhours = Math.floor(duration/60)
        let workmins = duration%60
        let whstr = workhours.toString()
        if (whstr.length == 1) {
            whstr='0'+whstr
        }
        let wmstr = workmins.toString()
        if (wmstr.length == 1) {
            wmstr='0'+wmstr
        }
        let totalwork = whstr+':'+wmstr
        if (duration > 539){
            let OT = 1
            let OTHours=Math.floor((duration-480)/60)
            let OTMins=(duration-480) % 60
            let OTHStr = OTHours.toString()
            let OTMStr = OTMins.toString()
            if (OTHStr.length === 1){
                OTHStr='0'+OTHStr
            }
            if (OTMStr.length === 1){
                OTMStr='0'+OTMStr
            }
            OTTotal = OTHours.toString()+':'+OTMins.toString()
            OTAmount = duration - 480
        } else {
            let OT = 0
            OTAmount = 0
            OTTotal = '00:00'
        }
    const worktime1 = new work_schema({
        emp_ID : data_emp_ID,
        indate : data.indate,
        intime : data.intime,
        outdate : data.outdate,
        outtime : data.outtime,
        working : x,
        cost_for_project : project_costing ,
        work_total : totalwork ,
        overtime : OTTotal,
        overtime_amount : OTAmount
    })
    worktime1.save()
    .then((result) => {
        res.redirect('/WTS')
    })
    .catch((err)=> {
        console.log(err)
   }
   )
})

}})})
}})}})})})
app.post('/new_project',(req,res)=>{
    const insta1 = new project_schema(req.body)
    insta1.save()
    .then((result) => {
        res.redirect('/BDS')
        })
    .catch((err)=> {
        console.log(err)
})})
app.post('/new_employee',(req,res)=>{
    const insta2 = new emp_schema(req.body)
    insta2.save()
    .then((result) => {
        res.redirect('/Fin')
        })
    .catch((err)=> {
        console.log(err)
})})

app.use((req,res)=> {
    res.render('Error' , {title : "Error"})})    