import type { IGetReportsArgs, IReport } from '../interfaces/reports.interface';
import type { IResponse } from '../interfaces/response.interface';

import { reportScrapperTimeout } from '../constants/timeouts';
import { reportScrapData } from '../helpers/infoScrapper';
import { puppeteerScript } from '../constants/scripts';

import handleResponse from '../helpers/handleResponse';
import stealth from 'puppeteer-extra-plugin-stealth';
import handleError from '../helpers/handleError';
import puppeteerExtra from 'puppeteer-extra';
import status from '../constants/status';
import config from '../config';

export const getReportScrapper = async (
  args: IGetReportsArgs
): Promise<IResponse<string>> => {
  const { licensePlate } = args;

  puppeteerExtra.use(stealth());

  const response = await puppeteerExtra
    .launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      page.evaluateOnNewDocument(puppeteerScript);

      // eslint-disable-next-line no-console
      console.log('config.scrappers.reports', config.scrappers.reports);

      await page.goto(config.scrappers.reports, { waitUntil: 'networkidle2' });

      const pageContent = await page.content();
      // eslint-disable-next-line no-console
      console.log('page.content', pageContent);

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
