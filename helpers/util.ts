import { IBooking } from "@/app/api/booking/bookings.service";

interface IHtmlTemplate {
    name: string;
    checkIn: string;
    checkOut: string;
}

export const generateTemplate = ({ name, checkIn, checkOut }: IHtmlTemplate) => {
    return `
      <html>
        <head>
          <style>
            /* Agrega estilos CSS según sea necesario */
            body {
              font-family: Arial, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            .header {
              background-color: #f2f2f2;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Nueva Reserva</h1>
            </div>
            <div class="content">
              <p>¡Hola ${name}!</p>
              <p>Has realizado una nueva reserva con las siguientes fechas:</p>
              <p>Fecha de Check-in: ${checkIn}</p>
              <p>Fecha de Check-out: ${checkOut}</p>
            </div>
          </div>
        </body>
      </html>
    `;
};
