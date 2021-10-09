import { useGetBlueQuery, useGetRiskQuery } from '@/services/blueApi';
import { useColorModeValues } from '@/utils/hooks/useColorModeValues';
import { useMobile } from '@/utils/hooks/useMobile';
import { Box, Flex, Text, Heading, Stack, Skeleton } from '@chakra-ui/react';

import { Card } from '../Card/Card';
import { Currency } from '../Currency/Currency';

export const Main = () => {
  const { borderColor } = useColorModeValues();
  const { data: riskInfo, isFetching: isFetchingRisk } = useGetRiskQuery(``);
  const { data: blueInfo, isFetching: isFetchingBlue } = useGetBlueQuery(``);
  const { isMobile } = useMobile(`(max-width: 480px`, [`column`, `row`]);

  return (
    <Flex
      width="100%"
      alignItems="center"
      flexDirection="column"
      borderTop="1px solid"
      borderColor={borderColor}
      marginTop="4rem"
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        width={{ sm: `100%`, md: `85%` }}
        maxWidth={{ md: `720px`, lg: `1980px` }}
        px={{ sm: `2rem`, md: `5rem` }}
      >
        <Flex alignItems="center" flexDirection="column" width="100%" py="4rem">
          <Heading>Arg. Analytics</Heading>
          <Text marginTop="2rem" textAlign="center">
            Obtené las diferentes cotizaciones del dólar, euro, reservas,
            evolución y riesgo país.
          </Text>
        </Flex>
        <Skeleton isLoaded={!isFetchingBlue && !isFetchingRisk}>
          {!isFetchingBlue && !isFetchingRisk && (
            <>
              <Currency blueInfo={blueInfo} />
              <Stack w="100%" spacing={4} direction={isMobile}>
                {!isFetchingRisk && (
                  <Card title="Riesgo País" value={riskInfo.value} />
                )}
                {!isFetchingBlue && (
                  <Card
                    title="Brecha Cambiaria"
                    value={`${(
                      (blueInfo.usd.oficial.value_sell /
                        blueInfo.usd.blue.value_sell) *
                      100
                    ).toFixed(2)} %`}
                  />
                )}
              </Stack>
            </>
          )}
        </Skeleton>
      </Flex>
    </Flex>
  );
};
