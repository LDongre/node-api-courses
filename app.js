//this returns a class
const Joi = require('joi') 
const express = require('express')
const app = express()

app.use(express.json())

const courses = [
    {id: 1, name: 'Course1'},
    {id: 2, name: 'Course2'},
    {id: 3, name: 'Course3'},
]

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {

    
    //const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);

    if(error)
        returnres.status(400).send(result.error.details[0].message)
        

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id == parseInt(req.params.id))
    if(!course) res.statusCode(404).send('id not found')
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    //if not existing return 404
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if(!course) res.status(404).send('the course is not available')
    const {error} = validateCourse(req.body);

    if(error)
        return res.status(400).send(result.error.details[0].message)
        
    //update course
    course.name = req.body.name;
    res.send(course)
    //return the updated course
})

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == parseInt(req.params.id))
    if(!course) return res.status(404).send('the course is not available')
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`))

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);

}