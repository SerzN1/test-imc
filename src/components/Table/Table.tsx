import React from 'react';
import './Table.css';

interface TableProps {
  children: React.ReactNode;
  useScroll?: boolean;
}

export const Table: React.FC<TableProps> = ({ children, useScroll = false }) =>
  useScroll ? (
    <div className="table-wrapper">
      <table className="table">{children}</table>
    </div>
  ) : (
    <table className="table">{children}</table>
  );

interface TableHeaderItem {
  name: string;
  align?: 'left' | 'right' | 'center';
  klass?: string;
}
interface TableHeaderProps {
  headerItems: Array<TableHeaderItem | string>;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ headerItems }) => {
  return (
    <thead className="table-head">
      <tr>
        {headerItems.map((headerItem: TableHeaderItem | string) =>
          typeof headerItem === 'string' ? (
            <th key={headerItem}>{headerItem}</th>
          ) : (
            <th
              key={headerItem.name}
              style={{ textAlign: headerItem.align }}
              className={headerItem.klass}>
              {headerItem.name}
            </th>
          )
        )}
      </tr>
    </thead>
  );
};

interface TableBodyProps {
  children: React.ReactNode;
}

export const TableBody: React.FC<TableBodyProps> = ({ children }) => (
  <tbody className="table-body">{children}</tbody>
);
