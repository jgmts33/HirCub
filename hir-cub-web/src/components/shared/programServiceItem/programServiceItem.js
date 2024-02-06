import React from 'react';
import './styles.scss';

import { ReactComponent as Mail } from '~/assets/svg/Mail.svg';
import { ReactComponent as Globe } from '~/assets/svg/Globe.svg';
import CollapsibleItem from '~/components/ui/collapsibleItem';

function ProgramServiceItem({ program }) {
  const { address = {} } = program || {};

  const validUrl = (url) => {
    if (!url.includes('http')) {
      return 'http://' + url;
    }
    return url;
  };

  const renderText = (text) => {
    return text && <p className="font-semibold">{text}</p>;
  };
  const renderContent = (text, content) => {
    return text && <p className="font-semibold">{content}</p>;
  };

  return (
    <div className="faq__item">
      <CollapsibleItem title={program.title}>
        <div className="faq__item-info">
          <div className="faq__info-blocks flex-block faq__program-item">
            <div className="faq__info-block">
              {renderText(address.address1)}
              <p className="font-semibold">
                {address.city}
                {address.city ? ', ' : ''}
                {address.provinceCode}
              </p>
              {renderText(address.postalCode)}
              {renderText(program.phone)}

              <div className="text-blue">
                {renderContent(
                  program.email,
                  <a
                    className="flex align-items-center"
                    href={`mailto:${program.email}`}
                    target="_blank"
                  >
                    <Mail />
                    <span>{program.email}</span>
                  </a>
                )}
                {renderContent(
                  program.programUrl,
                  <a
                    className="flex align-items-baseline"
                    href={validUrl(program.programUrl)}
                    target="_blank"
                  >
                    <Globe />
                    <span>{program.programUrl}</span>
                  </a>
                )}
              </div>
            </div>
            {program.description && (
              <div className="faq__info-block">
                <div
                  dangerouslySetInnerHTML={{ __html: program.description }}
                />
              </div>
            )}
          </div>
        </div>
      </CollapsibleItem>

      <hr />
    </div>
  );
}

export default ProgramServiceItem;
