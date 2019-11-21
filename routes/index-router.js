const express = require('express');
const router = express.Router();
const Todo = require('../model/Todo');
/* GET home page. */
const authcheck = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        res.redirect('/')
    }
    else { next(); }
}
router.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
});

router.get('/dashboard', authcheck, (req, res) => {
    res.render('backend/dashbord', { title: 'Dashboard',  logedIn: true })
});
router.get('/todo', authcheck, (req, res) => {
    alltodo = Todo.find({user_id:req.user._id}).then((data) => {
        res.render('backend/todo', { title: 'Todo', alltodo: data })
    })
});
router.post('/todo', authcheck, (req, res) => {
    if(req.body.id){
      Todo.findByIdAndUpdate(req.body.id,req.body)
      .then(() => {
        req.flash(
            'success_msg',
            'Updated successfully'  
                         );
        res.redirect('/todo');
    })
    }else{
  
    todo = new Todo({ todotext: req.body.todotext ,user_id:req.user._id})
    todo.save()
        .then(() => {
            req.flash(
                'success_msg',
                'Added successfully'  
                             );
            res.redirect('/todo');
        })
    }
});
router.get('/delete/:id', authcheck, (req, res) => {
       console.log(req.params.id)
      Todo.findByIdAndRemove(req.params.id)
      .then(() => {
        req.flash(
            'error_msg',
            'deleted successfully'  
                         );
        res.redirect('/todo');
    })    
});
module.exports = router;

