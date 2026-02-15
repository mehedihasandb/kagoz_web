import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isRouteAccessible } from '@/utils/routeAccessControl';

export const useRouteGuard = (path: string, onFail?: () => void) => {
   const { isAuthentication, user } = useSelector((state: any) => state.user);
  const router = useRouter();

  useEffect(() => {
    const canAccess = isRouteAccessible(path, user?.customerTypeName);
    if (!isAuthentication || !canAccess) {
      if (onFail) {
        onFail();
      } else {
        router.replace('/');
      }
    }
  }, [user, isAuthentication, path, router]);
};
