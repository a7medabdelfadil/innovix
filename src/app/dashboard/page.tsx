'use client';

import React from 'react'
import Container from '~/_components/Container'
import { Text } from '~/_components/Text';
import { useTranslation } from '~/hooks/useTranslatoins';

function Dashboard() {
   const { t } = useTranslation();

  return (
    <Container>
        <Text font={"bold"} size="3xl" >
          {t('welcomeToDashboard')}
        </Text>
    </Container>
  )
}

export default Dashboard