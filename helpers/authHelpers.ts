// Role hierarchy map
export const roleHierarchy: Record<string, string[]> = {
    'Member': ['Customer', 'Pre-Member', 'Member'],
    'Pre-Member': ['Customer', 'Pre-Member'],
    'Customer': ['Customer']
  };
  
  // Expand user type to include inherited roles
  export const getExpandedRoles = (userType: string | undefined): string[] => {
    if (!userType) return [];
    return roleHierarchy[userType] || [userType];
  };
  