import React, { useMemo } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import { useSuggestions } from '~/hooks';
import { hideSuggestions } from '~/actions/suggestions';
import { Button } from '~/components/ui';
import Modal from 'react-modal';
import './styles.scss';

const customStyles = {
  overlay: {
    zIndex: '100',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderWidth: '2px',
    borderColor: '#25739f',
    borderRadius: '12px',
    maxWidth: '460px',
    textAlign: 'center',
  },
};

function SuggestionsModal() {
  const {
    suggestions: { displayedSuggestionIds, hiddenSuggestionIds },
  } = useAppState();
  const { suggestions, addedSuggestions, handleAddSuggestions } =
    useSuggestions();

  const shownSuggestions = useMemo(() => {
    return displayedSuggestionIds
      .filter(
        (sId) => !hiddenSuggestionIds.includes(sId) && !addedSuggestions[sId]
      )
      .map((sId) => suggestions[sId]);
  }, [
    displayedSuggestionIds,
    hiddenSuggestionIds,
    addedSuggestions,
    suggestions,
  ]);
  const dispatch = useAppDispatch();
  const isOpen = shownSuggestions && shownSuggestions.length > 0;
  function handleCloseClick() {
    dispatch(hideSuggestions());
  }
  return (
    <Modal
      className="suggestions-modal"
      isOpen={isOpen}
      onRequestClose={handleCloseClick}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
    >
      <button className="close-modal" onClick={handleCloseClick}>
        &times;
      </button>
      {isOpen && (
        <div className="suggestions-modal_body">
          <div className="suggestions-modal_title">
            Would you like to learn more about it?
          </div>
          <div className="suggestions-modal_list">
            {shownSuggestions.map((suggestion) =>
              suggestion ? (
                <div
                  key={suggestion.id}
                  className="suggestions-modal_suggestion"
                >
                  <span className="suggestions-modal_suggestion-title">
                    {suggestion.title}
                  </span>
                  <Button
                    kind="purpure"
                    onClick={() => handleAddSuggestions([suggestion.id])}
                  >
                    Add
                  </Button>
                </div>
              ) : (
                <></>
              )
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default SuggestionsModal;
