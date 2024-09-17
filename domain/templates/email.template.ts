import { envs } from "../../src/config/envs.plugin";

export function generateCaseEmailTemplate(creationDate: Date, genre:string, age:number, lat: number, lng: number): string {
const mapboxUrl = generateMapboxStaticImageURL(lat,lng)
return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Caso</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #e8eaf6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4caf50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            position: relative;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .icon {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 40px;
            height: 40px;
        }
        .content {
            padding: 20px;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            background-color: #f4f4f4;
            color: #777;
            padding: 10px;
            text-align: center;
            font-size: 12px;
        }
        .map-img{
            width:100%;
            height:auto;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Detalles del Caso</h1>
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8"/></svg>
        </div>
        <div class="content">
            <p><strong>Fecha:</strong> ${creationDate}</p>
            <p><strong>Género:</strong> ${genre}</p>
            <p><strong>Edad:</strong> ${age}</p>
            <p><strong>Latitud:</strong> ${lat}</p>
            <p><strong>Longitud:</strong> ${lng}</p>
            <img src="${mapboxUrl}" class="map-img"/>
        </div>
        <div class="footer">
            <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
        </div>
    </div>
</body>
</html>
`;
}

export const generateMapboxStaticImageURL = (lat:number, lng:number) => {
  const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Reemplaza con tu token de acceso de Mapbox
  const zoom = 13; // Nivel de zoom
  const width = 800; // Ancho de la imagen
  const height = 500; // Altura de la imagen

return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}