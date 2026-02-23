import { useLocation } from "react-router-dom";

export default function CatalogPage() {
  const location = useLocation();

  return (
    <div className="page">
      <div className="page-container">
        {location.search === "" ? <>Catalog Overview</> : <>Catalog Search</>}
      </div>
    </div>
  );
}
