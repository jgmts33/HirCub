import React from 'react';
import ActionList from '~/components/shared/actionList';
import './styles.scss';

function ProgramsAndServicesList(props) {
  const { type, programs, setProgramStatus } = props;
  return (
    <ActionList
      type={type}
      programItems={programs}
      renderProgramLine={item => (
        <span
          key={item.id}
          className={`program ${item.active ? 'program-active' : ''}`}
        >
          {item.name}
        </span>
      )}
      changeProgramStatus={setProgramStatus}
    />
  );
}

export default ProgramsAndServicesList;
