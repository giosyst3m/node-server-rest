//===== PUERTO =====

process.env.PORT = process.env.PORT || 3000;

//===== Vencimiento =====
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//===== SEED =====
process.env.SEED = process.env.SEED || 'este-es-seed-desarrollo';

//===== ENTORNO =====
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//===== DB =====
let urlDB;


if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//===== Google Client ID =====
process.env.CLIENT_ID = process.env.CLIENT_ID || '329179793494-sng7vmnuocr7rsa2sld75jgt2jae52op.apps.googleusercontent.com';