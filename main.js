// Define una función asíncrona llamada start
const start = async () => {
    // Solicita permiso para capturar la pantalla del usuario y espera a que el usuario lo otorgue
    const stream = await navigator.mediaDevices.getDisplayMedia(
        {
            // Configuración del flujo de video
            video: {
                mediaSource: "screen", // Especifica que la fuente del video es la pantalla
            },
        });

    // Crea un array vacío para almacenar los datos del video grabado
    const data = [];
    
    // Crea una instancia de MediaRecorder para grabar el flujo de la pantalla
    const mediaRecorder = new MediaRecorder(stream);

    // Define un evento para cuando hay datos disponibles durante la grabación
    mediaRecorder.ondataavailable = (e) => {
        // Agrega los datos del evento al array data
        data.push(e.data);
    };

    // Inicia la grabación del video
    mediaRecorder.start();

    // Define un evento para cuando se detiene la grabación
    mediaRecorder.onstop = (e) => {
        // Selecciona el elemento <video> en el documento y establece su fuente
        document.querySelector("video").src = URL.createObjectURL(
            // Crea un objeto Blob a partir de los datos grabados. 
            //Un Blob (Binary Large Object) representa un objeto de datos de tamaño grande y como imágenes, audio, video, entre otros.
            new Blob(
                data, {
                    type: data[0].type, // Establece el tipo de datos del Blob
                })
        );
    };
};

// Llama a la función start para iniciar el proceso de grabación de la pantalla
start();
