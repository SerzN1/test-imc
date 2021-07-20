import React, { memo } from 'react';
import { useLatestInvoices } from '../api/useInvoices';
import { Table, TableHeader, TableBody } from '../components/Table/Table';
import { ValueTypeFilter } from '../constant';

interface LatestInvoicesTableProps {
  valueType: ValueTypeFilter;
}

const nf = new Intl.NumberFormat();

export const LatestInvoicesTable: React.FC<LatestInvoicesTableProps> = memo(
  ({ valueType }) => {
    const latestInvoicesTableHeader = [
      'id',
      'date',
      'customer name',
      'region',
      {
        name:
          valueType === ValueTypeFilter.margin
            ? 'total margin'
            : 'invoice total',
        align: 'right' as 'right',
      },
    ];

    const { isLoading, data, error } = useLatestInvoices();

    if (isLoading) {
      return <div>...is loading</div>;
    }

    if (error) {
      return <div>loading error</div>;
    }

    return (
      <Table useScroll={true}>
        <TableHeader headerItems={latestInvoicesTableHeader} />
        <TableBody>
          {data.map(
            ({
              id,
              customer_name,
              date,
              total_margin,
              total_invoice,
              region,
            }: IInvoice) => (
              <tr key={id}>
                <td align="left">{id}</td>
                <td>{date}</td>
                <td>{customer_name}</td>
                <td>{region}</td>
                <td align="right">
                  {valueType === ValueTypeFilter.margin
                    ? nf.format(total_margin)
                    : nf.format(total_invoice)}
                </td>
              </tr>
            )
          )}
        </TableBody>
      </Table>
    );
  }
);
