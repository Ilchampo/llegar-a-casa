import type { Request, Response } from 'express';

import { getVehicleData } from '../services/vehicle.service';
import { parsePlate } from '../helpers/parsePlate';

import status from '../constants/status';

export const getVehicle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { licensePlate } = req.params;

  if (!licensePlate || licensePlate === '') {
    res
      .status(status.BAD_REQUEST)
      .json({ message: 'License plate is required' });
  }

  try {
    const vehicle = await getVehicleData({
      licensePlate: parsePlate(licensePlate),
    });

    res.status(vehicle.status).json(vehicle);
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error', error });
  }
};
