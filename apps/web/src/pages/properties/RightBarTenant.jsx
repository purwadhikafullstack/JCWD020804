import { ListPropertyTenant } from './RightBar/ListProperty';
import loginImage from '../../assets/masnstay.jpg';

export const RightBarTenant = ({ stateRightBar }) => {
  const DASHBOARD = 0;
  const LIST_PROPERTY = 0;
  const renderRightBar = (stateRightBar) => {
    switch (stateRightBar) {
      case DASHBOARD: {
        return (
          <div style={{ textAlign: 'center' }}>
            
            <img
              src={loginImage}
              alt="Dashboard Image"
              style={{ width: '200px', height: 'auto' }}
            />
            <p>Welcome to MasnStay</p>
          </div>
        );
      }
      case LIST_PROPERTY: {
        return <ListPropertyTenant />;
      }
      default:
        return null; // Handle other cases if needed
    }
  };

  return <div>{renderRightBar(stateRightBar)}</div>;
};