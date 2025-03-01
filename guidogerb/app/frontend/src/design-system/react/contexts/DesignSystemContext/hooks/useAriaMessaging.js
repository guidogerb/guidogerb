import { useCallback, useMemo } from 'react';
import { useDesignSystemContext } from '../useDesignSystemContext.js';

/** @returns {{addAssertiveMessage: (message: string) => void, addPoliteMessage: (message: string) => void}} */
export function useAriaMessaging() {
  const [, setState] = useDesignSystemContext();

  const addPoliteMessage = useCallback(
    /**
     * @param {string} message
     * @returns {void}
     */
    (message) => { setState((draftState) => { draftState.ariaLive.politeMessages.push(message); }); },
    [setState]
  );

  const addAssertiveMessage = useCallback(
    /**
     * @param {string} message
     * @returns {void}
     */
    (message) => { setState((draftState) => { draftState.ariaLive.assertiveMessages.push(message); }); },
    [setState]
  );

  return useMemo(() => ({ addAssertiveMessage, addPoliteMessage }), [addAssertiveMessage, addPoliteMessage]);
}
