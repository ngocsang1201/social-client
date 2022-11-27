import { Tab, Tabs } from '@mui/material';
import { useCustomMediaQuery } from 'hooks';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

export function SettingTabs() {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation('settingTabs');

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const tab = checkTab(location.search);
    setActiveTab(tab);
  }, [location.search]);

  const checkTab = (pathname: string) => {
    switch (pathname) {
      case '?tab=edit-profile':
        return 0;
      case '?tab=change-password':
        return 1;
      default:
        return 0;
    }
  };

  const goto = (linkTo: string) => {
    navigate(`/settings?tab=${linkTo}`, { replace: true });
  };

  const tabItemList = [
    {
      label: t('profile.label'),
      mobileLabel: t('profile.mobileLabel'),
      path: 'edit-profile',
    },
    {
      label: t('password.label'),
      mobileLabel: t('password.mobileLabel'),
      path: 'change-password',
    },
  ];

  const smUp = useCustomMediaQuery('up', 'sm');

  return (
    <Tabs
      value={activeTab}
      orientation={smUp ? 'vertical' : 'horizontal'}
      variant={smUp ? 'standard' : 'fullWidth'}
      sx={{
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: { xs: 'auto auto 0 0', sm: '0 0 auto auto' },
          width: { xs: '100%', sm: 'auto' },
          height: { xs: '1px', sm: 'auto' },
          bgcolor: { xs: 'divider', sm: 'transparent' },
        },
      }}
    >
      {tabItemList.map(({ label, mobileLabel, path }, idx) => (
        <Tab
          key={idx}
          label={smUp ? label : mobileLabel}
          onClick={() => goto(path)}
          sx={{
            fontSize: { xs: 16, sm: 18 },
            fontWeight: 500,
            textTransform: 'none',
            alignItems: { sm: 'flex-start' },
            pr: { sm: 4 },
          }}
        />
      ))}
    </Tabs>
  );
}
