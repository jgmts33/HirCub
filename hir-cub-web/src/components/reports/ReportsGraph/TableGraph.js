import React from 'react';

const TableGraph = ({ data, columns }) => {
  return (
    <div className="reports-block-table">
      <div className="reports-block-table__heading">
        {columns && columns.map((column, index) => (
          <div
            key={index}
            className={`reports-block-table__heading-item --${column.keyMapping}`}
          >
            {column.label}
          </div>
        ))}
      </div>
      <div className="reports-block-table__body">
        {data && data.map((datum, index) => {
          const key = `row-${index}`;

          return (
            <div key={key} className="reports-block-table__body-row">
              {columns && columns.map(column => (
                <div
                  key={`${key}-${column.keyMapping}`}
                  className={`reports-block-table__body-row__item --${column.keyMapping}`}
                >
                  <span className="flex-1">{datum[column.keyMapping] || ''}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableGraph;
