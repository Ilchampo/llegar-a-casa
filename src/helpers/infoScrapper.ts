import type { IVehicle } from '../interfaces/vehicle.interface';
import type { IReport } from '../interfaces/reports.interface';

import * as cheerio from 'cheerio';

export const vehicleScrapData = (html: string): IVehicle => {
  try {
    const $ = cheerio.load(html);

    const vehicle: IVehicle = {
      licensePlate: $('h5:contains("Placa")').next('p').text().trim(),
      brand: $('h5:contains("Marca")').next('p').text().trim(),
      model: $('h5:contains("Modelo")').next('p').text().trim(),
      year: parseInt(
        $('h5:contains("Año Vehículo")').next('p').text().trim(),
        10
      ),
      color: $('h5:contains("Color")').next('p').text().trim(),
      stolen:
        $('h5:contains("Reportado Robado")').next('p').text().trim() === 'NO'
          ? false
          : true,
    };

    return vehicle;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const reportScrapData = (html: string): IReport[] => {
  const $ = cheerio.load(html);
  const reports: IReport[] = [];

  try {
    $('table').each((i, table) => {
      const place = $(table).find('td:contains("LUGAR")').next().text().trim();
      const dateString = $(table)
        .find('td:contains("FECHA")')
        .next()
        .text()
        .trim();
      const description = $(table)
        .find('td:contains("DELITO")')
        .nextAll()
        .eq(0)
        .text()
        .trim();

      const date = new Date(dateString);

      const suspects: string[] = [];
      $(table)
        .nextAll('table')
        .find('tr')
        .each((j, row) => {
          const estado = $(row).find('td:last-child').text().trim();
          if (estado === 'SOSPECHOSO') {
            const name = $(row).find('td:nth-child(2)').text().trim();
            suspects.push(name);
          }
        });

      if (suspects.length > 0) {
        reports.push({
          place,
          date,
          description,
          suspects,
        });
      }
    });

    return reports;
  } catch (error) {
    throw new Error(error as string);
  }
};
