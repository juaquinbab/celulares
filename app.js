const express = require('express');
const path = require('path');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const colors = require('colors');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const bodyParser = require('body-parser');
require('dotenv').config();
const multer = require('multer'); // Para manejar la carga de archivos
const filePath = './numerosNo.json';

const app = express();

app.use(express.static(__dirname + '/public'));

const port = process.env.PORT;


const SESSION_FILE_PATH = './session.json';

let sessionData;

if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}


app.get('/descargar', (req, res) => {
  const file = path.join(__dirname, 'numerosNo.json');
  res.download(file);  // Descarga el archivo
});



const client = new Client({
  puppeteer: {
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    handleSIGINT: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  authStrategy: new LocalAuth({ clientId: "Client-one" }),
  // webVersionCache: {
  //   type: 'remote',
  //   remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2413.51-beta.html '
  // }
});


process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  await client.destroy();
  process.exit(0);
})





client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});




client.on('authenticated', (session) => {
  console.log('Conexión exitosa');
  sessionData = session;
  if (sessionData) {
      fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
          if (err) {
              console.error(err);
          }
      });
  }
});





  // const mediaFilemp3 = MessageMedia.fromFilePath(`./public/media/${'image.mp3'}`)
  // const mediaFilemp4 = MessageMedia.fromFilePath(`./public/media/${'image.mp4'}`)
  const mediaFilejpg = MessageMedia.fromFilePath(`./public/media/${'1.png'}`)


let MSGbien = null; // inicia el Mensaje de bienvenida
let etapa = 0;

const registro = {



}; // Registra los numeros telefono que inician al programa 

// setInterval(() => {
//   console.log(registro)
// }, 5000);


client.on('message', async (message) => {
  //console.log(`Mensaje recibido de ${message.from}: ${message.body}`);




  // Este codigo verifica que ya se envio el mensaje de bienvenida
  if (!registro[message.from]) {
    client.sendMessage(message.from, 'Bienvenido a CrediMoviles! ✅\n\nTIENES UN CUPO PREAPROBADO PARA RENOVAR TU CELULAR SIN IMPORTAR QUE NO TENGAS VIDA CREDITICIA O ESTÉS REPORTADO📲 Estrena SOLO CON TU CÉDULA CUOTA INICIAL DEL EQUIPO DESDE $50 Mil PESOS.\n\n\n📍La cuota inicial la entregas cuando recibas tu equipo.\n\n🚨Cual marca de celular deseas estrenar🚨Escribe por favor el numero de tu marca a cotizar.\n\n✅(1) Samsung.\n✅(2) Xiaomi.\n✅(3) Motorola.\n✅(4) Oppo.\n✅(5) Tecno.\n✅(6) OTRA.\n\n\nEscriba el numero de la opción de su interés ');
    

    registro[message.from] = { etapa: 0, numeroDocumento: '' };
    // registro[message.from] = true; // Register the phone number
    return;
  }

  if (MSGbien !== null) { // Check if MSGbien exists
    client.sendMessage(message.from, MSGbien);
    MSGbien = null; // Reset to a falsy value after sending
  } else {
    console.log('Error al verificar el mensaje de bienvenida');
  }

  // setTimeout(() => {
  //   delete registro[message.from];
  // }, 150 * 10000);






  switch (registro[message.from].etapa) {



    case 0:

    if (!(message.body.toLowerCase() === "1" || message.body.toLowerCase() === "2"  || message.body.toLowerCase() === "3" || message.body.toLowerCase() === "4" || message.body.toLowerCase() === "5" )) {
      client.sendMessage(message.from, 'Por favor escribe un numero del 1 al 5');
    
     } else if (message.body === ('1')) {
        client.sendMessage(message.from, '✅ Samsung.\n\n📱1•A04 64+4 $450.000 ( Con Cargador ) \n\n📱2•A14 128+4 $599.000🇨🇴\n\n📱3•A15 256+8 $755.000🇨🇴 \n\n📱4•A25 5G 128+6  1 Sim $890.000🇨🇴\n\n📱5•A35 5G 256+8  $1.200.000🇨🇴\n\n📱6•A55 5G 256+8  $1.575.000🇨🇴\n\n\nPor favor escribe el número del celular de tu interes');
        // client.sendMessage(message.from, mediaFilemp4)
        registro[message.from].etapa = 11;
      } else if (message.body === ('2')) {
        client.sendMessage(message.from, '✅ Xiaomi\n\n📱1•REDMI A3 64+3 $490.000 🇨🇴 \n\n📱2•REDMI A3x 128+4 $565.000 🇨🇴\n\n📱3•REDMI 13C 128+4 $650.000🇨🇴n\n📱4•REDMI 13C 256+8 $759.000🇨🇴\n\n📱5•NOTE 10S 128+6 $699.000🇨🇴\n\n📱6•NOTE 12 128+6 $795.000 🇨🇴\n\n📱7•NOTE 13 256+8 $899.000 🇨🇴\n\n📱8•POCO M3 Pro 128+6 $799.000🇨🇴\n\n📱9•POCO M5s 256+8 $975.000🇨🇴n\n📱10•POCO M6 Pro 512+12 $1.200.000🇨🇴\n\n\nPor favor escribe el número del celular de tu interes');
        registro[message.from].etapa = 11;

      } else if (message.body === ('3')) {
        client.sendMessage(message.from, '✅ Motorola.\n\n📱1•MOTO G04s 128+4 $430.000 🇨🇴\n\n📱2•MOTO G14  128+4 $499.000🇨🇴\n\n📱3•MOTO G24 256+4+4 RAM BOOST $599.000 🇨🇴\n\n📱4•MOTO G34 5G 256+8+8 RAM BOOST $789.000 🇨🇴\n\n📱5•MOTO G54 5G 128+8 $670.000🇨🇴\n\n📱6•MOTO EDGE 50 FUSIÓN 5G 256+8+8 RAM BOOST 1.270.000 🇨🇴\n\n\nPor favor escribe el número del celular de tu interes');
        registro[message.from].etapa = 11;
     
      } else if (message.body === ('4')) {
        client.sendMessage(message.from, ' ✅ Oppo.\n\n📱1•A58 128+6 $735.000🇨🇴 \n\n📱2•A58 256+8 $859.000 🇨🇴\n\n📱3•RENO 11 5G 256+12 $1.999.000 🇨🇴 \n\n\nQuieres estrenar y pagar a cuotas.\n\nSI\n\nNO');
        registro[message.from].etapa = 11;
      
      } else if (message.body === ('5')) {
        client.sendMessage(message.from, '✅ Tecno.\n\n📱1•SPARK Go 2024 64+3 $390.000🇨🇴\n\n📱2•POVA NEO  64+4 $390.000🇨🇴\n\n📱3•SPARK 8P 128+4 $435.000🇨🇴\n\n📱4•SPARK Go 2024 128+4 $440.000🇨🇴\n\n📱5•SPARK 20C 128+4 $470.000 🇨🇴\n\n📱6•SPARK 20C 256+4 $535.000 🇨🇴n\n\n📱7•SPARK 20 256+8 $575.000 🇨🇴\n\n📱8•POVA 6 256+12 $985.000 🇨🇴\n\n\nPor favor escribe el número del celular de tu interes');
        registro[message.from].etapa = 11;
   
      } else if (message.body === ('6')) {
      client.sendMessage(message.from, 'Por favor indíqueme en que marca esta interesa@');
      registro[message.from].etapa = 12;
 
    }
      break;


      case 11:

      if (isNaN(message.body)) {
        client.sendMessage(message.from, 'Por favor escribe el número del celular de tu interes');
    
      } else if (!isNaN(message.body)) {

        client.sendMessage(message.from, 'Quieres estrenar y pagar a cuotas.\n\nSI\n\nNO');
        registro[message.from].etapa = 13;

      }
        break;



        case 12:

     if (message.body.length > 2) {

        client.sendMessage(message.from, 'Quieres estrenar y pagar a cuotas.\n\nSI\n\nNO');
        registro[message.from].etapa = 13;

      }
        break;
  
  



    case 13:

    if (!(message.body.toLowerCase() === "si" || message.body.toLowerCase() === "no"  )) {
      client.sendMessage(message.from, 'Por favor escribe si o no');
    
     } else if (message.body.toLowerCase() === "si" ) {
        // Verificar si el mensaje tiene más de 2 letras
        client.sendMessage(message.from, 'Un asesor experto te contactara en breve.');
        client.sendMessage('573026084428@c.us',  `Este Usuario está esperando un asesor ${message.from}`);
        registro[message.from].etapa = 20; 

      } else if (message.body.toLowerCase() === "no" ) {
        // Verificar si el mensaje tiene más de 2 letras
        client.sendMessage(message.from, '¿Lo deseas adquirir de contado con descuento?\n\nSI\n\nNO');
        registro[message.from].etapa = 21;

      }
      break;








      case 21:

        if (!(message.body.toLowerCase() === "si" || message.body.toLowerCase() === "no"  )) {
          client.sendMessage(message.from, 'Por favor escribe si o no');
        
         } else if (message.body.toLowerCase() === "si" ) {
            // Verificar si el mensaje tiene más de 2 letras
            client.sendMessage(message.from, 'Un asesor experto te contactara en breve.');
            client.sendMessage('573026084428@c.us',  `Este Usuario está esperando un asesor ${message.from}`);
            
            
            
            registro[message.from].etapa = 20;
    
          
          
          // Verifica y agrega el número que escribió "no"
           }  else if (message.body.toLowerCase() === "no" ) {
            client.sendMessage(message.from, 'Esperamos más adelante poder atenderte.');
        
            // Intenta cargar el archivo existente, o crea una lista vacía si no existe
            let numerosNo = [];
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf-8');
                if (data) {
                    numerosNo = JSON.parse(data);  // Carga los números existentes
                }
            }
        

            // Agregar el número a la lista si no está ya presente
            if (!numerosNo.includes(message.from)) {
                numerosNo.push(message.from);  // Agrega el número
        
                delete registro[message.from];
                // Guardar la lista actualizada en el archivo JSON
                fs.writeFileSync(filePath, JSON.stringify(numerosNo, null, 2), 'utf-8');
            }
          }
      break;







  }


});




// Desde aqui inica el cargue de la imagen al servidor 

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'public/media');
    // Asegúrate de que el directorio exista
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath); // Directorio de destino para las imágenes
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const filename = 'image' + extname;
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filePath = path.join(__dirname, 'public/media', 'image' + path.extname(file.originalname));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    cb(null, true);
  },
});

// Configurar la carpeta 'public/media' como estática
app.use('/media', express.static(path.join(__dirname, 'public/media')));

app.post('/upload', upload.single('image'), (req, res) => {
  const successMessage = `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      #popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        padding: 20px;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        text-align: center;
        max-width: 90%;
        width: 400px;
        z-index: 1000;
      }
      #popup p {
        color: #007BFF; /* Color azul */
        font-size: 18px;
        margin-bottom: 10px;
      }
      #popup img {
        max-width: 100%;
        height: auto;
        border-radius: 4px;
        margin-bottom: 20px;
      }
      #popup button {
        background-color: #007BFF; /* Color azul */
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease;
      }
      #popup button:hover {
        background-color: #0056b3; /* Azul más oscuro al pasar el ratón */
      }
      #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
      }
    </style>
  </head>
  <body>
    <div id="overlay"></div>
    <div id="popup">
      <p>Imagen cargada con éxito</p>
      <img src="/media/${req.file.filename}" alt="Imagen subida">
      <button onclick="closePopup()">Cerrar</button>
    </div>
    <script>
      function closePopup() {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
        window.location.href = '/'; // Cambia esto al URL de tu página
      }
    </script>
  </body>
  </html>
`;
  res.send(successMessage);
});



// 



let MSGenvio = true;




// Desde aqui Robot de envio Mesivo

client.on('auth_failure', (msg) => {
  console.error('Error de autenticación:', msg);
});


client.on('ready', () => {
  console.log('Cliente listo');
});

client.initialize();


app.use(bodyParser.json()); // Usar body-parser para analizar JSON
app.use(bodyParser.urlencoded({ extended: true })); // Usar body-parser para analizar datos codificados en URL

// Array para almacenar los registros de mensajes enviados
const registros = [];

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
//  });


app.post('/procesar', (req, res) => {
  const { numbers, messages } = req.body;

  console.log('Números de Teléfono:', numbers);
  console.log('Mensajes:', messages);

  if (!numbers || !messages) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }

  if (!Array.isArray(numbers) || !Array.isArray(messages)) {
    res.status(400).send('Los datos enviados no son válidos.');
    return;
  }



  const sendMedia = async (to, file) => {
    try {
      const mediaFile = MessageMedia.fromFilePath(`public/media/${file}`);
      await client.sendMessage(to, mediaFile);
    } catch (error) {
      console.error(`Error al enviar el archivo multimedia: ${error.message}`);
    }
  };
  
  // ///////////////////////////////////////
  
  let messageCounter = 0;

  app.post('/cambiar', (req, res) => {
    MSGenvio = !MSGenvio; // Cambiamos el valor de MSGenvio
    res.json({ MSGenvio });
  });
  
 
  
  
  app.use(express.json());
  
  // ///////////////////////////////////////////////////////////////
  
  numbers.forEach((phoneNumber, index) => {
    const phoneNumberWithSuffix = `${phoneNumber}@c.us`;
    const message = messages[index] || ""; // Asigna una cadena vacía si el mensaje no está presente para ese número
  
    setTimeout(async () => {
      try {
        if (MSGenvio) {
          await sendMedia(phoneNumberWithSuffix, 'image.jpg');
        }
        await client.sendMessage(phoneNumberWithSuffix, message);
  
        const registro = {
          mensaje: `Mensaje ${++messageCounter} enviado a ${phoneNumberWithSuffix}`,
          numero: phoneNumberWithSuffix
        };
  
        registros.push(registro); // Agregar el registro al array de registros
        console.log(registro.mensaje.green);
  
        // Verifica si estás en el último elemento del array
        if (index === numbers.length - 1) {
          registros.push({ mensaje: 'Terminé de enviar los mensajes', numero: 'Oprima el botón para borrar el registro' });
          console.log('Terminé de enviar');
        }
      } catch (error) {
        console.log(`Error al enviar el mensaje a ${phoneNumberWithSuffix}: ${error.message}`.red);
      }
    }, 15000 * (index + 1));
  });
  




  res.status(200).send('Datos recibidos correctamente');


  app.get('/registros', (req, res) => {
    const ultimosRegistros = registros.slice(-10); // Obtener los últimos 10 registros

    res.json(ultimosRegistros); // Enviar los últimos 10 registros como respuesta en formato JSON
  });

});

// Ruta para borrar los registros
app.delete('/borrar-registros', (req, res) => {
  registros.length = 0; // Borra todos los registros
  res.json({ message: 'Registros borrados exitosamente' });
});






app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});