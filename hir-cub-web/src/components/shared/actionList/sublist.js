import React from 'react';
import { PermissionAllow, PermissionType, SuggestionStatus } from '~/consts';
import { CancelButton, LikeButton } from '~/components/ui';
import { usePermission } from '~/hooks';
import './styles.scss';

const typeClasses = {
  '1': 'webpage',
  '2': 'book',
  '3': 'video',
};

function Sublist(props) {
  const { tabPermission } = usePermission(PermissionType.Library);
  const isWritePermissionAllowed =
    tabPermission && tabPermission.allowed == PermissionAllow.Write;

  const { type, items, renderLine, changeStatus } = props;
  if (!items || items.length === 0) {
    return null;
  }
  return (
    <React.Fragment>
      {items.map((item) => {
        const typeClass = item.type
          ? `item-type item-type-${typeClasses[item.type]}`
          : null;
        return (
          <li className={`flex ${typeClass ? typeClass : ''}`} key={item.id}>
            {renderLine(item)}
            {isWritePermissionAllowed && (
              <div className="btn-group">
                {type !== SuggestionStatus.Favorite && (
                  <LikeButton
                    onClick={() =>
                      changeStatus(item.id, SuggestionStatus.Favorite)
                    }
                  />
                )}
                {type !== SuggestionStatus.Archived && (
                  <CancelButton
                    onClick={() =>
                      changeStatus(item.id, SuggestionStatus.Archived)
                    }
                  />
                )}
              </div>
            )}
          </li>
        );
      })}
    </React.Fragment>
  );
}

export default Sublist;
