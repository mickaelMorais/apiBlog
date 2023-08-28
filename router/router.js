const express = require('express')
const router = express.Router()
const usuarios = []
const posts = []
let id = 1
let idPost = 1

router.get('/usuarios', (req,res) =>{
    res.json(usuarios)
})

router.get('/post', (req,res)=>{
    res.json(posts)
})

router.post('/cadastrarUsuario', (req,res)=>{
    const {nome, bio, email, senha} = req.body
    usuarios.push({
        id: id,
        nome:nome,
        bio:bio,
        email:email,
        senha:senha
    })
    id++
    res.json(usuarios)
})

router.post('/postar/:id', (req,res)=>{
    const {conteudo} = req.body
    const {id} = req.params
    posts.push({
        conteudo:conteudo,
        id:idPost,
        idUsuario:id
    })
    idPost++
    res.json(posts)
})

router.put('/editarUsuarios/:id', (req,res)=>{
    const {id} = req.params
    const {nome, email, bio, senha} = req.body
    const usuarioIndex = usuarios.findIndex((usuario) => usuario.id == id)

    if (usuarioIndex === -1) {
        res.status(404).json({mesage: 'usuario não encontrado'})
    } else{
        const usuarioAtualizado = {
            id,
            nome,
            bio,
            email,
            senha
        }
        usuarios[usuarioIndex] = usuarioAtualizado
        res.json({mesage: 'usuario editado'})
    }
})

router.put('/editarPost/:id', (req,res)=>{
    const {id} = req.params
    const {conteudo} = req.body
    const postIndex = posts.findIndex((post) => post.id == id)

    if (postIndex === -1) {
        res.status(404).json({mesage: 'postagem não encontrado'})
    } else{
        const postAtualizado = {
            id,
            conteudo,
            idUsuario:posts[postIndex].idUsuario
        }
        posts[postIndex] = postAtualizado
        res.json({mesage: 'postagem editado'})
    }
})

router.delete('/deletarUsuario/:id', (req,res) =>{
    const {id} = req.params
    const usuario = usuarios.findIndex((usuario) => usuario.id === id)
    usuarios.splice(usuario, 1)
    res.json({'mensage': 'produto deletado com sucesso'})
})

router.delete('/deletarPost/:id', (req,res) =>{
    const {id} = req.params
    const post = posts.findIndex((post) => post.id === id)
    posts.splice(post, 1)
    res.json({'mensage': 'produto deletado com sucesso'})
})

module.exports = router