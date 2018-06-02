//===== PUERTO =====

process.env.PORT = process.env.PORT || 3000;

//===== ENTORNO =====
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===== DB =====
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb://user-cafe:Bogota01@ds129600.mlab.com:29600/gs3-cafe';
}

process.env.URLDB = urlDB;