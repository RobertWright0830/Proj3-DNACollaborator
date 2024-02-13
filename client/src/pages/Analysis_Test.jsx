import Upload from "../components/Upload";
import CurrentTable from "../components/Table/CurrentTable";

const Analysis_Test = () => {

return (
  <div className="container">
    <Upload />
    <h3>Chromosome Segment Table</h3>
    <p>Sort in ascending or descending order by selecting the header.</p>
    <CurrentTable />
  </div>
);
}

export default Analysis_Test;
