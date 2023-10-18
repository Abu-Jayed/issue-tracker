// import IssueForm from "../_components/IssueForm";
import dynamic from "next/dynamic";
import LoadingNewIssuePage from "./loading";

const IssueForm = dynamic(
  ()=> import('../_components/IssueForm'),
  {ssr: false,
  loading: ()=> <LoadingNewIssuePage /> }
)

const NewIssuePage = () => {
  return (
    <IssueForm></IssueForm>
  );
};

export default NewIssuePage;