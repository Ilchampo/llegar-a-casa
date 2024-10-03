import { Router } from 'express';

import * as controller from '../controllers/reports.controller';

const router = Router();

// @route  GET /reports/:licensePlate
// @params licensePlate
// @desc   Get reports data by license plate
router.get('/:licensePlate', controller.getReports);

export default router;
