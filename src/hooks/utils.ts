import { RefObject } from 'react';

export const getRefElement = (element?: RefObject<Element>): Element => {
  return element?.current;
};

export const isSSR: boolean = !(
  typeof window !== 'undefined' && window.document?.createElement
);
