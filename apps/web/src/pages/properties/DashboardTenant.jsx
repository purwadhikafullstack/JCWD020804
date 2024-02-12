import { ListPropertyTenant } from './RightBar/ListProperty';
import { RightBarTenant } from './RightBarTenant';
import { SidebarTenant } from './SidebarTenant';
import { TestProps } from './TestProps';

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
