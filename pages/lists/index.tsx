import { GetStaticProps } from "next";

import { List } from "@prisma/client";
import { Table, Typography } from "antd";
import { prisma } from "../../lib/prisma";

import type { ColumnsType } from "antd/es/table";

const { Title, Text, Link } = Typography;

interface ListsProps {
  lists: Array<List>;
}

const columns: ColumnsType<List> = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Produto",
    dataIndex: "product_array",
    key: "product_array",
  },
];

export default function Lists({ lists }: ListsProps) {
  return (
    <div>
      <Title level={3}>Listas</Title>
      <br />

      <Link href="/lists/new">
        <Text>Create a new Brand</Text>
      </Link>

      <Table
        dataSource={lists}
        columns={columns}
        rowKey={(record) => record.id.toString()}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const lists = await prisma.list.findMany();

  return {
    props: {
      lists,
    },
    revalidate: 10,
  };
};


/*import { List } from "@prisma/client";
import { GetStaticProps } from "next";
import { prisma } from "../../lib/prisma";

import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';

interface ListsProps {
  key: React.Key;
  title: String;
  productArray: String;
  units: number;
  userId: number;
  sector: string;
}

const columns: ColumnsType<List> = [
  {
    title: 'Produto',
    dataIndex: 'productArray',
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
    productArray: "John Brown",
    units: 32,
    sector: 'New York No. 1 Lake Park',
  },
  {
    key: '4',
    productArray: 'Disabled User',
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
*/