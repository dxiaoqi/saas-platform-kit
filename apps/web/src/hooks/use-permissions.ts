import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export function usePermissions() {
  const { data: session } = useSession();
  const [permissions, setPermissions] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchUserPermissions(session.user.id).then(setPermissions);
    }
  }, [session]);

  const hasPermission = (permission: string) => permissions.includes(permission);
  const hasPermissions = (requiredPermissions: string[]) =>
    requiredPermissions.every(permission => permissions.includes(permission));

  return {
    permissions,
    hasPermission,
    hasPermissions,
  };
}

async function fetchUserPermissions(userId: number): Promise<string[]> {
  const response = await fetch(`/api/users/${userId}/permissions`);
  const data = await response.json();
  return data.permissions;
}
