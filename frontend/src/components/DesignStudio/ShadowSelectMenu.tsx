import React, { useEffect } from 'react';
import { Select } from 'antd';
import { Label } from '../../styles/util';
import { useAppDispatch } from '../../redux/reduxHooks';
import { setShadow } from '../../redux/elementSlice';
import useGetEditingMode from '../../hooks/useGetEditingMode';
import useTargetElement from '../../hooks/useTargetElement';
import useCurrentComponent from '../../hooks/useCurrentComponent';

const { Option } = Select;

interface Shadow {
  key: string;
  value: string;
}

interface Props {
  id: string;
  val: Shadow;
  buttonState: string;
  setVal: (value: Shadow | ((prevVal: Shadow) => Shadow)) => void;
  options: Shadow[];
  label: string;
}

const ShadowSelectMenu: React.FC<Props> = ({
  id,
  val,
  buttonState,
  setVal,
  options = [{}],
  label,
}) => {
  const dispatch = useAppDispatch();
  const editingMode = useGetEditingMode();
  const target = useTargetElement();
  const currentComponent = useCurrentComponent();

  const handleChange = (value, x) => {
    setVal({ key: x.key, value: x.value });

    if (currentComponent.id)
      dispatch(
        setShadow({
          undo: true,
          id: currentComponent.id,
          buttonState,
          shadow: value,
        })
      );
  };

  useEffect(() => {
    if (target) {
      if (buttonState === 'normal' && target.style.desktop.boxShadow) {
        setVal(target.style.desktop.boxShadow);
      } else if (
        buttonState === 'hover' &&
        'hover' in target.style.desktop &&
        target.style.desktop.hover?.boxShadow
      ) {
        setVal(target.style.desktop.hover.boxShadow);
      }
    }
  }, [target, editingMode, buttonState, setVal]);

  return (
    <>
      {label && (
        <Label
          htmlFor={id}
          style={{ display: 'flex', flexDirection: 'column' }}>
          {label}
        </Label>
      )}
      <Select
        id={id}
        defaultValue={val?.value}
        value={val?.value}
        style={{ width: '100%', borderRadius: '3px' }}
        onChange={handleChange}>
        {options.map((el) => (
          <Option value={el.value} key={el.key}>
            {el.key}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default ShadowSelectMenu;
