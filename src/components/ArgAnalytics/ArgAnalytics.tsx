import {
  useGetBlueQuery,
  useGetRiskQuery,
  useGetBlueHistoryQuery,
  useGetOficialHistoryQuery,
} from '@/services/blueApi';
import { useMobile } from '@/utils/hooks/useMobile';
import { Flex, Text, Heading, Stack, StackDirection } from '@chakra-ui/react';
import { Card } from '../Card/Card';
import { LineChart } from '../Charts/LineChart';
import { Currency } from '../Currency/Currency';

export const ArgAnalytics = () => {
  const { data: riskInfo, isFetching: isFetchingRisk } = useGetRiskQuery(``);
  const { data: blueInfo, isFetching: isFetchingBlue } = useGetBlueQuery(``);
  const { data: currencyBlueDays, isFetching: isFetchingCurrencyBlueDays } =
    useGetBlueHistoryQuery();

  const {
    data: currencyOficialDays,
    isFetching: isFetchingCurrencyOficialDays,
  } = useGetOficialHistoryQuery();
  const isFetchingCurrency: boolean =
    !isFetchingCurrencyBlueDays && !isFetchingCurrencyOficialDays;
  const isFetchingBlueAndRisk: boolean = !isFetchingBlue && !isFetchingRisk;

  const { isMobile, mobile } = useMobile<StackDirection>(`(max-width: 480px`, [
    `column`,
    `row`,
  ]);
  return (
    <Flex width="100%" alignItems="center" flexDirection="column">
      <Flex
        alignItems="center"
        flexDirection="column"
        width={{ sm: `100%`, md: `85%` }}
        maxWidth={{ md: `720px`, lg: `1280px` }}
        px={{ sm: `2rem`, md: `5rem` }}
      >
        <Flex alignItems="center" flexDirection="column" width="100%" py="4rem">
          <Heading>Arg. Analytics</Heading>
          <Text marginTop="2rem" textAlign="center">
            Obtené las diferentes cotizaciones del dólar, euro, reservas,
            evolución y riesgo país.
          </Text>
        </Flex>
        {isFetchingBlueAndRisk && (
          <Flex w="100%" direction="column">
            <Currency blueInfo={blueInfo} />
            <Stack
              w="100%"
              spacing={4}
              direction={isMobile}
              transition="all 2ms"
            >
              <Card
                title="Riesgo País"
                value={`${Number(riskInfo.value).toFixed(2)} Puntos`}
              />
              <Card
                title="Brecha Cambiaria"
                value={`${(
                  ((blueInfo.usd.blue.value_sell -
                    blueInfo.usd.oficial.value_sell) /
                    blueInfo.usd.oficial.value_sell) *
                  100
                ).toFixed(2)} %`}
              />
            </Stack>
          </Flex>
        )}
        {!mobile && isFetchingCurrency && (
          <LineChart
            blueHistory={currencyBlueDays || []}
            oficialHistory={currencyOficialDays || []}
          />
        )}
      </Flex>
    </Flex>
  );
};