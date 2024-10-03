import { Router } from 'express';

import * as controller from '../controllers/vehicle.controller';

const router = Router();

// @route  GET /vehicle/:licensePlate
// @params licensePlate
// @desc   Get vehicle data by license plate
router.get('/:licensePlate', controller.getVehicle);

export default router;
