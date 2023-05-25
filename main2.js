app.get('/AML' , (req , res) => {
    x=0
    res.render('AML' , {title : "AML"})})

app.post('/AML' , (req , res)=> {
    x=req.body.peace1
    y=req.body.number1
    console.log(x,y)
    res.render('AML' , {title : "AML" , x})})

    but=document.createElement('input')  
    but.setAttribute('type','submit')      
    but.setAttribute('class','button nodisp')      
    but.setAttribute('id','final')      
    but.setAttribute('value','Submit')  
    w=document.getElementById('formpro')
    w.appendChild(but)    


    mongoose.set('strictQuery', false)
    const URL = 'mongodb+srv://Kavignaani:STE952R@cluster0.dp6plma.mongodb.net/test'
    mongoose.connect(URL , {useNewUrlParser : true , useUnifiedTopology: true})
        .then((result)=> app.listen(3000))
        .catch((err)=> console.log(err))

        app.get('/save',(req,res)=> {
            const blog = new Blog({
                title : 'Vignesh VN',
                snippet : {'a':'1','b':'2'},
                body : 'xxxxxx'
        
            })
            blog.save()
                .then((result) => {
                    res.send(result)
                })
                .catch((err) => {
                    console.log(err)
                })
        
        })
        app.get('/seeone',(req , res) => {
            Blog.findById('')
            .then((result) => {
                res.send(result)
            })
            .catch((err)=> {
                console.log(err)
            })
        })
        

        
        






