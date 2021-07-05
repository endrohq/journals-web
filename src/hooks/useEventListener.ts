import { useRef, useEffect, useCallback, RefObject } from 'react';
import { getRefElement } from './utils';

interface UseEventListener {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: RefObject<Element> | null;
  options?: AddEventListenerOptions;
}

export const useEventListener = ({
  type,
  listener,
  element,
  options
}: UseEventListener): void => {
  const savedListener = useRef<EventListener>();

  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  useEffect(() => {
    const target = getRefElement(element) || document;
    target?.addEventListener(type, handleEventListener, options);
    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
};
