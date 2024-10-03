import type { Request, Response } from 'express';

import { getReportsData } from '../services/reports.service';
import { parsePlate } from '../helpers/parsePlate';

import status from '../constants/status';

export const getReports = async (
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
    const reports = await getReportsData({
      licensePlate: parsePlate(licensePlate),
    });

    res.status(reports.status).json(reports);
  } catch (error) {
    res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal server error', error });
  }
};
