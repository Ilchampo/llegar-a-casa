export interface IVehicle {
  licensePlate: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  stolen: boolean;
}

export interface IGetVehicleArgs {
  licensePlate: string;
}
