import type {
  IVehicle,
  IGetVehicleArgs,
} from '../interfaces/vehicle.interface';
import type { IResponse } from '../interfaces/response.interface';

import { vehicleScrapData } from '../helpers/infoScrapper';

import handleResponse from '../helpers/handleResponse';
import handleError from '../helpers/handleError';
import status from '../constants/status';
import FormData from 'form-data';
import config from '../config';
import axios from 'axios';

export const getVehicleScrapper = async (
  args: IGetVehicleArgs
): Promise<IResponse<string>> => {
  const { licensePlate } = args;

  try {
    const form = new FormData();

    form.append('placa_vehiculo', licensePlate);

    const response = await axios.post(config.scrappers.vehicle, form);

    if (response.data.length === 0) {
      return handleResponse<string>(status.NOT_FOUND, response.data);
    }

    return handleResponse<string>(status.OK, response.data);
  } catch (error) {
    return handleError<string>(error);
  }
};

export const getVehicleData = async (
  args: IGetVehicleArgs
): Promise<IResponse<IVehicle | undefined>> => {
  const { licensePlate } = args;

  try {
    const vehicleScrapped = await getVehicleScrapper({ licensePlate });

    if (vehicleScrapped.status !== status.OK || !vehicleScrapped.data) {
      return handleResponse<IVehicle | undefined>(status.NOT_FOUND, undefined);
    }

    const vehicle = vehicleScrapData(vehicleScrapped.data);

    return handleResponse<IVehicle>(status.OK, vehicle);
  } catch (error) {
    return handleError<IVehicle>(error);
  }
};
