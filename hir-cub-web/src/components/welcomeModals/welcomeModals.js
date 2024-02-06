import React, { useState } from 'react';
import useAppState from '~/appState';
import { useAppDispatch } from '~/appState';
import { closeWelcomeModals } from '~/actions/global';
import { HowAreYouDoingModal, HowCanWeHelpModal } from '~/components/modals';

function WelcomeModals() {
  const [alreadyShowedPopups, setAlreadyShowedPopups] = useState(false);
  const [isHowAreYouDoingModalOpen, setIsHowAreYouDoingModalOpen] = useState(
    true
  );
  const [isHowCanWeHelpModalOpen, setIsHowCanWeHelpModalOpen] = useState(false);
  const {
    global: { showWelcomeModals },
  } = useAppState();
  const dispatch = useAppDispatch();
  function handleCloseHowAreYouDoingModal() {
    setAlreadyShowedPopups(true);
    setIsHowAreYouDoingModalOpen(false);
    setIsHowCanWeHelpModalOpen(true);
    dispatch(closeWelcomeModals());
  }
  function handleCloseHowCanWeHelpModal() {
    setIsHowCanWeHelpModalOpen(false);
  }
  return (
    <React.Fragment>
      <HowAreYouDoingModal
        isOpen={
          showWelcomeModals && !alreadyShowedPopups && isHowAreYouDoingModalOpen
        }
        close={handleCloseHowAreYouDoingModal}
      />
      <HowCanWeHelpModal
        isOpen={isHowCanWeHelpModalOpen}
        close={handleCloseHowCanWeHelpModal}
      />
    </React.Fragment>
  );
}

export default WelcomeModals;
