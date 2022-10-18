import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Simple state manager for modals.
 * Reference: https://react.carbondesignsystem.com/?path=/story/components-modal--with-state-manager
 */
export const ModalStateManager = ({
  renderLauncher: LauncherContent,
  children: ModalContent,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      {!ModalContent || typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ModalContent open={open} setOpen={setOpen} />,
            document.body
          )}
      {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
    </>
  );
};
