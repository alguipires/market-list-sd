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
    title: "Usuario",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Produto",
    dataIndex: "product_array",
    key: "product_array",
  },
  {
    title: "Setor",
    dataIndex: "sector",
    key: "sector",
  },
];

export default function Lists({ lists }: ListsProps) {
  return (
    <div>
      <Title level={3}>Listas</Title>
      <br />

      <Link href="/api/list/create">
        <Text>Criar uma nova lista</Text>
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