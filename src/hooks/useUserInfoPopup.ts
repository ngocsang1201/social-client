import { UserInfoPopup } from '~/components/common';
import { AnchorEl, User } from '~/models';
import { useEffect, useRef, useState } from 'react';

export interface UseUserInfoPopup {
  user: Partial<User>;
  anchorEl: AnchorEl;
}

export function useUserInfoPopup(props: UseUserInfoPopup) {
  const [openPopup, setOpenPopup] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return onMouseLeave;
  }, []);

  const onMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenPopup(true);
    }, 500);
  };

  const onMouseLeave = () => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setOpenPopup(false);
  };

  const userInfoPopupComponent = UserInfoPopup({ open: openPopup, ...props });

  return {
    userInfoPopupComponent,
    mouseEvents: { onMouseEnter, onMouseLeave },
  };
}
