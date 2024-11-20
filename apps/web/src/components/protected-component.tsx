import { usePermissions } from '../hooks/use-permissions';

export function ProtectedComponent() {
  const { hasPermission } = usePermissions();

  if (!hasPermission('users:create')) {
    return <div>无权访问</div>;
  }

  return <div>{/* 受保护的内容 */}</div>;
}
