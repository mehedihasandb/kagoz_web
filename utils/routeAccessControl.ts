import { getExpandedRoles } from "@/helpers/authHelpers";

export const protectedRoutes = [
    { path: '/my-events', allowedRoles: ['Pre-Member'] },
    { path: '/registration-form', allowedRoles: ['Customer'] },
    { path: '/registration-form/create', allowedRoles: ['Customer'] },
    { path: '/facility-booking', allowedRoles: ['Customer'] },
    // Add more protected routes here
  ];
  
  export const isRouteAccessible = (path: string, userType: string | undefined) => {
    const route = protectedRoutes.find(r => r.path === path);
    if (!route) return true; 
    const expandedRoles = getExpandedRoles(userType);
    return route.allowedRoles.some(role => expandedRoles.includes(role))
  };
  