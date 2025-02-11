

const verificaCorpo = (req, res, next) => {
    if (!numero || !capacidade || !status) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
    }

    next();


}

module.exports = verificaCorpo;