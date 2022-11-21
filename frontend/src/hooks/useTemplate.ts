// Returns a function that takes in a template ID and dispatches said template to redux and sets it as the current template.
// Overwrites any data in currently edited CTA.

import { useDispatch } from "react-redux";
import { setCurrentComponent } from "../redux/currentComponentSlice";
import { setTemplate } from "../redux/elementSlice";
import {
  templateOne,
  templateTwo,
  templateThree,
  templateFour,
  templateFive,
  templateSix,
  blankTemplate,
  waveTemplate,
  cliffTemplate,
  joshuaTreeTemplate,
  otterTemplate,
  pumpkinTemplate,
  comoTemplate,
  cityTemplate,
  cafeTemplate,
} from "../templateEnums";

import { useCallback } from "react";
import { setLoading } from "../redux/loadingSlice";

export const useTemplate = () => {
  const dispatch = useDispatch();

  return useCallback(
    (id: number) => {
      // Set currentComponent to null in order to close top bar
      dispatch(setCurrentComponent({ id: null, type: null }));
      dispatch(setLoading({ loading: true }));

      switch (id) {
        case 0:
          dispatch(setTemplate({ undo: true, template: blankTemplate }));
          break;
        case 1:
          dispatch(setTemplate({ undo: true, template: templateOne }));

          break;
        case 2:
          dispatch(setTemplate({ undo: true, template: templateTwo }));
          break;
        case 3:
          dispatch(
            setTemplate({
              undo: true,
              template: templateThree,
            })
          );
          break;
        case 4:
          dispatch(setTemplate({ undo: true, template: templateFour }));
          break;
        case 5:
          dispatch(setTemplate({ undo: true, template: templateFive }));
          break;
        case 6:
          dispatch(setTemplate({ undo: true, template: templateSix }));
          break;

        case 7:
          dispatch(setTemplate({ undo: true, template: waveTemplate }));
          break;
        case 8:
          dispatch(setTemplate({ undo: true, template: cliffTemplate }));
          break;
        case 9:
          dispatch(setTemplate({ undo: true, template: joshuaTreeTemplate }));
          break;
        case 10:
          dispatch(setTemplate({ undo: true, template: otterTemplate }));
          break;
        case 11:
          dispatch(setTemplate({ undo: true, template: pumpkinTemplate }));
          break;
        case 12:
          dispatch(setTemplate({ undo: true, template: comoTemplate }));
          break;
        case 13:
          dispatch(setTemplate({ undo: true, template: cityTemplate }));
          break;
        case 14:
          dispatch(setTemplate({ undo: true, template: cafeTemplate }));
          break;
        default:
          break;
      }
    },
    [dispatch]
  );
};
