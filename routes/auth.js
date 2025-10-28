const express = require(`express`);
const router = express.Router();
const User = require(`../models/users`);
const bcrypt = require(`bcrypt`);

router.get(`/`, (req, res) => {
    res.render(`auth`);
});
 
router.post(`/register`, async (req, res) => {
    const {username, password} = req.body;

    try {
        const existingUser = await User.findByUsername(username);
        if(existingUser) {
            req.flash(`error_msg`, `Usuario já existe`);
            return res.redirect(`/auth`);
        }
        
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        
        await User.createUser(username, password_hash);

        req.flash(`success_msg`, `${username}, cadastrado com sucesso`);
        res.redirect(`/auth`);
    } catch(error) {
        console.error(error);
        req.flash(`error_msg`, `Erro ao criar o usuario`);
        res.redirect(`/auth`);
    }
})

router.post(`/login`, async (req, res) => {
    const {username, password} = req.body;
    
    try {
    const existingReg = await User.findByUsername(username);
    if(!existingReg) {
        req.flash(`error_msg`, `Usuario não encontrado!`);
        return res.redirect(`/auth`);
    }

    const isMatch = await bcrypt.compare(password, existingReg.password_hash);
    if(!isMatch) {
        req.flash(`error_msg`, `Senha incorreta`);
        return res.redirect(`/auth`);
    }

    req.session.userId = existingReg.id;

    req.flash(`success_msg`, `Login realizado com sucesso`);
    res.redirect(`/tasks`);
  } catch(error) {
    console.error(error);
    req.flash(`error_msg`, `Erro ao tentar fazer login`);
    res.redirect(`/auth`);
  }
});

router.get(`/logout`, (req, res) => {
    req.session.destroy((err) => {
        if(err) {
           
            req.flash(`success_msg`, `Você saiu da sua conta com sucesso!`);

            console.error(err);
            req.flash(`error_msg`, `Erro ao tentar sair, tente novamente`);
            return res.redirect(`/profile`)
        }
        res.clearCookie(`connect.sid`);
        res.redirect(`/auth`);
    });
});

module.exports = router;