import { useEffect, useRef, useState } from 'react';

/**
 * @template KeyboardEventHandlerT
 * @param {object} params
 * @param {string} params.whichKeyCode https://www.w3.org/TR/uievents-key/#named-key-attribute-values
 * @param {import('react').KeyboardEventHandler<KeyboardEventHandlerT>} [params.onKeyDown]
 * @param {import('react').KeyboardEventHandler<KeyboardEventHandlerT>} [params.onKeyUp]
 * @returns {boolean}
 */
export function useGlobalKeyEvent({ whichKeyCode, onKeyDown, onKeyUp }) {
  const [keyPressed, setKeyPressed] = useState(false);

  const keydownFuncRef = useRef(/** @type {((e: KeyboardEvent) => void) | null} */(null));
  useEffect(
    () => {
      /** @param {KeyboardEvent} e */
      keydownFuncRef.current = (e) => {
        if (
          e.code === whichKeyCode
          || (/** @type {any} */ (e).keyCode === whichKeyCode) // deprecated but still checking
          || e.key === whichKeyCode
        ) {
          if (e.type === 'keydown') {
            setKeyPressed(true);
            if (onKeyDown) {
              onKeyDown(/** @type {any} */ (e));
            }
          } else if (e.type === 'keyup') {
            setKeyPressed(false);
            if (onKeyUp) {
              onKeyUp(/** @type {any} */ (e));
            }
          }
        }
      };
      document.addEventListener('keydown', keydownFuncRef.current);
      document.addEventListener('keyup', keydownFuncRef.current);

      return () => {
        if (keydownFuncRef.current) {
          document.removeEventListener('keydown', keydownFuncRef.current);
          document.removeEventListener('keyup', keydownFuncRef.current);
        }
        keydownFuncRef.current = null;
      };
    },
    [onKeyDown, onKeyUp, whichKeyCode]
  );

  return keyPressed;
}
