import React, { memo } from 'react';
import { useBestCustomers } from '../api/useBestCustomers';
import { Table, TableHeader, TableBody } from '../components/Table/Table';
import { ValueTypeFilter } from '../constant';

interface BestCustomersTableProps {
  valueType: ValueTypeFilter;
}

const nf = new Intl.NumberFormat();

export const BestCustomersTable: React.FC<BestCustomersTableProps> = memo(
  ({ valueType }) => {
    const { isLoading, data, error } = useBestCustomers();

    if (isLoading) {
      return <div>...is loading</div>;
    }
    if (error) {
      return <div>loading error</div>;
    }

    const bestCustomersTableHeader = [
      'id',
      'name',
      { name: 'region', klass: 'd-sm-hidden' },
      { name: 'invoices', align: 'right' as 'right' },
      { name: valueType, align: 'right' as 'right' },
    ];

    return (
      <Table>
        <TableHeader headerItems={bestCustomersTableHeader} />
        <TableBody>
          {data.map(
            ({
              customer_id,
              customer_name,
              customer_region,
              invoices_count,
              total_margin,
              total_revenue,
            }: ICustomerAPI) => (
              <tr key={customer_id}>
                <td align="left">{customer_id}</td>
                <td>{customer_name}</td>
                <td className="d-sm-hidden">{customer_region}</td>
                <td align="right">{invoices_count}</td>
                <td align="right">
                  {valueType === ValueTypeFilter.margin
                    ? nf.format(total_margin)
                    : nf.format(total_revenue)}
                </td>
              </tr>
            )
          )}
        </TableBody>
      </Table>
    );
  }
);
