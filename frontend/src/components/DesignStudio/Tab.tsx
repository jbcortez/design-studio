import React from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

interface Props {
  style: React.CSSProperties;
  setButtonState: (value: string | ((prev: string) => string)) => void;
}

const Tab: React.FC<Props> = ({ style, setButtonState }) => {
  const handleChange = (key) => {
    setButtonState(key);
  };

  return (
    <Tabs style={style} defaultActiveKey='normal' onChange={handleChange}>
      <TabPane tab='Normal' key='normal'></TabPane>
      <TabPane tab='Hover' key='hover'></TabPane>
    </Tabs>
  );
};

export default Tab;
