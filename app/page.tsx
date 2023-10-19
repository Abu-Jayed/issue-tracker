import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <>
      <div>This is our home</div>
      <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}></Pagination>
    </>
  );
}
