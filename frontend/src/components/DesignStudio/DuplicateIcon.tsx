import React, { useState } from 'react';
import ControlPointDuplicateIcon from '@mui/icons-material/ControlPointDuplicate';
import { useAppDispatch } from '../../redux/reduxHooks';
import { IconStyles } from '../../styles/util';
import { addElement } from '../../redux/elementSlice';
import useElements from '../../hooks/useElements';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useGetSelectedItems from '../../hooks/useGetSelectedItems';
import { Elements } from '../../types';

const DuplicateIcon = () => {
  const dispatch = useAppDispatch();

  const elements = useElements().present;
  const selected = useGetSelectedItems();

  const [components, setComponents] = useState<Elements>([]);

  useEffect(() => {
    if (elements.length > 0) {
      const selectedComponents = elements.filter((el) =>
        selected.some((id) => id === el.id)
      );

      let compCopy: Elements = [];

      selectedComponents.forEach((comp) => {
        compCopy.push(JSON.parse(JSON.stringify(comp)));
      });

      compCopy.forEach((comp) => {
        comp.id = uuidv4();

        comp.style = {
          desktop: {
            ...comp.style.desktop,
            top: {
              value: comp.style.desktop.top?.value
                ? comp.style.desktop.top.value + 20
                : 0,
            },
            left: {
              value: comp.style.desktop.left?.value
                ? comp.style.desktop.left.value + 20
                : 0,
            },
          },

          mobile: {
            ...comp.style.mobile,
            top: {
              value: comp.style.mobile.top?.value
                ? comp.style.mobile.top.value + 20
                : 0,
            },
            left: {
              value: comp.style.mobile.left?.value
                ? comp.style.mobile.left.value + 20
                : 0,
            },
          },
        };
      });

      setComponents(compCopy);
    }
  }, [selected, elements]);

  const handleDuplicate = () => {
    if (components && Object.keys(components).length > 0) {
      dispatch(addElement({ selected: components }));
    }
  };

  return (
    <IconStyles onClick={handleDuplicate} aria-label='Duplicate' title={'Duplicate'}>
      <ControlPointDuplicateIcon fontSize='large' />
    </IconStyles>
  );
};

export default DuplicateIcon;
