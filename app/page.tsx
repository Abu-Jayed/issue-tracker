import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <div>This is our home</div>
      <Pagination itemCount={100} pageSize={10} currentPage={2}></Pagination>
    </>
  );
}
