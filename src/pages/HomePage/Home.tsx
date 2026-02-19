import { BookOfTheWeek } from "../../features/landing";
import "./Home.css";
import type { JSX } from "@emotion/react/jsx-runtime";

export default function HomePage(): JSX.Element {
  return (
    <div className="page">
      <div className="home-page-container">
        <div className="home-page-left">
          <BookOfTheWeek />
        </div>
      </div>
    </div>
  );
}
