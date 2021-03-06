import type { NextApiRequest, NextApiResponse } from 'next';
import { HistoryCurrencyData } from '@/types/Blue';
import { config } from '@/config/config';

async function getCurrencyData(url: string): Promise<HistoryCurrencyData[]> {
  const latest = await fetch(url);
  return latest.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { did } = req.query;
  try {
    if (did === `all`) {
      const days = await getCurrencyData(
        `${config.base_url_blue}/evolution.json`,
      );
      res.status(200).send(days);
    }
    const days = await getCurrencyData(
      `${config.base_url_blue}/evolution.json?days=${did}`,
    );
    res.status(200).send(days);
  } catch (err) {
    const error = new Error(`No available`);
    res.status(400).send(error);
  }
}
