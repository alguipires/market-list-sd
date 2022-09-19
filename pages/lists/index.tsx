import { GetStaticProps } from "next";

import { List } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

interface ListsProps {
  key: React.Key;
  Product: string;
  Units: number;
  Sector: string;
}

const columns: ColumnsType<ListsProps> = [
  {
    title: 'Produto',
    dataIndex: 'product',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Quantidade',
    dataIndex: 'units',
  },
  {
    title: 'Setor',
    dataIndex: 'sector',
  },
];

const data: ListsProps[] = [
  {
    key: '1',
    product: 'John Brown',
    units: 32,
    sector: 'New York No. 1 Lake Park',
  },
  {
    key: '4',
    product: 'Disabled User',
    units: 99,
    sector: 'Sidney No. 1 Lake Park',
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: ListsProps[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: ListsProps) => ({
    disabled: record.product === 'Disabled User', // Column configuration not to be checked
    product: record.product,
  }),
};

const App: React.FC = () => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

  return (
    <div>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setSelectionType(value);
        }}
        value={selectionType}
      >
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>

      <Divider />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default App;