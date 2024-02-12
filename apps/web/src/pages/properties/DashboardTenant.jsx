import { RightBarTenant } from './RightBarTenant';
import { SidebarTenant } from './SidebarTenant';

export const DashboardTenant = ({ checkState }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row justify-evenly items-center">
        <SidebarTenant />
        <RightBarTenant stateRightBar={0} />
      </div>
    </div>
  );
};
