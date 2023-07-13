import { Spin } from 'antd';
import Styles from './full-loading.module.scss';
const FullLoading: React.FC = () => {
  return (
    <div className={Styles['loading']}>
      <Spin size="large" />
    </div>
  );
};

export default FullLoading;
