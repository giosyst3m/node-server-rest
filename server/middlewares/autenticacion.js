const jwt = require('jsonwebtoken');

//====== Verifiacar Token =====

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

//====== Verifiacar Admin Rol =====
let verificaAdminRol = (req, res, next) => {

    let usuario = req.usuario
    if (!usuario.rol == 'ADMIN_ROL') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'No autorizado'
            }
        });
    } else {
        next();
    }

};

module.exports = {
    verificaToken,
    verificaAdminRol
}