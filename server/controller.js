const bcrypt = require('bcrypt')

module.exports = {
    //user related modules
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = await db.users.check_user(username)
        if(user[0]){
            return res.status(409).send('User already exists')
        }
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        
        const [newUser] = await db.users.create_user([username, hash])
        req.session.user = {
            userId: newUser.user_id,
            username: newUser.username
        }
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [foundUser] = await db.users.check_user(username)
        if(!foundUser){
            return res.status(401).send('Incorrect login info')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if(authenticated){
            req.session.user = {
                userId: foundUser.user_id,
                username: foundUser.username
            }
            res.status(200).send(req.session.user)
        }
        else{
            res.status(401).send('Incorrect login info')
        }
    },
    getPfp: (req, res) => {
        const db = req.app.get('db')
        const userId = req.session.user.userId
        db.users.get_user_pfp(userId).then((pfp) => res.status(200).send(pfp)).catch(err => console.log(err))
    },
    editPfp: (req, res)=>{
        const db = req.app.get('db')
        const userId = req.session.user.userId
        const {banner, pfp} = req.body
        db.users.edit_pfp(userId, pfp, banner).then((pfp) => res.status(200).send(pfp))
    },

    //post related modules
    newPost: async (req, res) => {
        const db = req.app.get('db')
        const {description, img} = req.body
        const userId = req.session.user.userId
        await db.posts.add_post([description, img, userId])
        res.sendStatus(200)
    },
    getPosts: (req, res) => {
        const db = req.app.get('db')
        db.posts.get_all_posts().then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    getUserPosts: (req, res) => {
        const db = req.app.get('db')
        const userId = req.session.user.userId
        db.posts.get_user_posts(userId).then((posts) => res.status(200).send(posts)).catch(err => console.log(err))
    },
    getIndivPosts: async (req, res) => {
        try{
            const db = req.app.get('db')
            const {id} = req.params
            const [post] = await db.posts.get_one_post(+id)
            res.status(200).send(post)
        }
        catch(err){
            console.log(err)
        }
    },
    editPost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        const {description} = req.body
        db.posts.edit_post(id, description).then((post) => res.status(200).send(post))
    },
    deletePost: (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        db.posts.delete_post(+id)
        res.sendStatus(200)
    },

    //comments related modules
    newComment: async (req, res) => {
        const db = req.app.get('db')
        const {newCommentBody, postId, userId} = req.body
        try{
            await db.comments.create_comment(newCommentBody, postId, userId)
            res.sendStatus(200)
        }catch(err){
            console.log(err)
        }
    },
    getComments: async (req, res) => {
        const db = req.app.get('db')
        const {id} = req.params
        try{
            const comments = await db.comments.get_comments(id)
            res.status(200).send(comments)

        }
        catch(err){
            console.log(err)
        }
    },
    editComment: async (req, res) => {
    },
    deleteComment: async (req, res) => {
        const db= req.app.get('db')
        const {id} = req.params
        db.comments.delete_comment(id)
        res.sendStatus(200)
    },
}