import { useState, useCallback } from 'react';

/**
 * Custom hook to control modal confirmation dialogs for create, edit, and delete operations.
 */
export function useConfirmation() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isDestructive: false,
    iconType: 'create', // 'create' | 'danger' | 'warning' | 'info'
    onConfirm: () => {},
  });

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfig({
        title: options.title || 'Confirm Action',
        message: options.message || 'Are you sure you want to proceed?',
        confirmText: options.confirmText || 'Confirm',
        cancelText: options.cancelText || 'Cancel',
        isDestructive: options.isDestructive || false,
        iconType: options.iconType || (options.isDestructive ? 'danger' : 'create'),
        onConfirm: () => {
          setIsOpen(false);
          if (options.onConfirm) {
            options.onConfirm();
          }
          resolve(true);
        },
      });
      setIsOpen(true);
    });
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    config,
    confirm,
    close,
  };
}
