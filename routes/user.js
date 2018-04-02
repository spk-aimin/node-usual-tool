var express = require('express');
var router = express.Router();
router.get('/info', (req, res, error)=> {
    const user = new User();
    res.render('user/userInfo', {title: 'userInfo', user: user.getUser()});
})
module.exports = router;

class User {
    constructor() {
        this.user = 'aimin';
    }
    getUser() {
        return this.user;
    }
}