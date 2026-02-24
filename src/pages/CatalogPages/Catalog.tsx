import { useLocation } from "react-router-dom";
import { CatalogOverview } from "../../features/catalog";
import { CatalogSearch } from "../../features/catalog";

export default function CatalogPage() {
  const location = useLocation();

  return (
    <div className="page">
      <div className="page-container">
        {location.search === "" ? <CatalogOverview /> : <CatalogSearch />}
      </div>
    </div>
  );
}
