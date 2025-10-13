import multer from 'multer'; // será usado para processar uploads de arquivos.

// Configuração do armazenamento no disco
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Define a pasta de destino (garanta que ela existe!)
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    // Torna o nome único usando timestamp ou outro identificador
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export default upload;

// O filename define o nome do arquivo ao salvá-lo no servidor.
// file.originalname mantém o nome original do arquivo.
