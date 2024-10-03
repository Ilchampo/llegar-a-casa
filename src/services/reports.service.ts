import type { IGetReportsArgs, IReport } from '../interfaces/reports.interface';
import type { IResponse } from '../interfaces/response.interface';

import { reportScrapperTimeout } from '../constants/timeouts';
import { reportScrapData } from '../helpers/infoScrapper';
import { puppeteerScript } from '../constants/scripts';

import handleResponse from '../helpers/handleResponse';
import handleError from '../helpers/handleError';
import status from '../constants/status';
import puppeteer from 'puppeteer';
import config from '../config';

export const getReportScrapper = async (
  args: IGetReportsArgs
): Promise<IResponse<string>> => {
  const { licensePlate } = args;

  const response = await puppeteer
    .launch({ headless: true })
    .then(async (browser) => {
      const page = await browser.newPage();
      page.evaluateOnNewDocument(puppeteerScript);
      await page.goto(config.scrappers.reports, { waitUntil: 'networkidle2' });

      await page.type('#pwd', licensePlate);
      await page.click('#btn_buscar_denuncia');
      await page.waitForFunction(
        () => !document.querySelector('#loading')?.innerHTML.trim(),
        { timeout: reportScrapperTimeout }
      );

      const resultHtml = await page.$eval('#resultados', (el) => el.innerHTML);

      await browser.close();

      return resultHtml;
    });

  return handleResponse(status.OK, response);
};

export const getReportsData = async (
  args: IGetReportsArgs
): Promise<IResponse<IReport[] | undefined>> => {
  const { licensePlate } = args;

  try {
    const reportScrapped = await getReportScrapper({ licensePlate });

    if (reportScrapped.status !== status.OK || !reportScrapped.data) {
      return handleResponse<IReport[] | undefined>(status.NOT_FOUND, undefined);
    }

    const reports = reportScrapData(reportScrapped.data);

    return handleResponse<IReport[]>(status.OK, reports);
  } catch (error) {
    return handleError<IReport[]>(error);
  }
};
