import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import delay from "delay";
import { Metadata } from "next";
import IssueActions from "./IssueActions";
import IssueTable, { IssueQuery, columnNames } from "./IssueTable";

interface Props {
  searchParams: IssueQuery;
}
const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  await delay(1500);

  const issueCount = await prisma.issue.count({
    where: { status },
  });

  return (
    <>
      <Flex direction={"column"} gap={"3"}>
        <IssueActions></IssueActions>
        <IssueTable searchParams={searchParams} issues={issues}></IssueTable>
        <Pagination
          pageSize={pageSize}
          currentPage={page}
          itemCount={issueCount}
        ></Pagination>
      </Flex>
    </>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 20

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
