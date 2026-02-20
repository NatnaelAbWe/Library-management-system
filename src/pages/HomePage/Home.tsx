import { BookOfTheWeek } from "../../features/landing";
import "./Home.css";
import type { JSX } from "@emotion/react/jsx-runtime";
import { UpcomingEvents } from "../../features/landing";
import { LibraryHours } from "../../features/landing";
import { LibraryCard } from "../../features/landing";
import { ContactUs } from "../../features/landing";

export default function HomePage(): JSX.Element {
  return (
    <div className="page">
      <div className="home-page-container">
        <div className="home-page-left">
          <BookOfTheWeek />
          <UpcomingEvents />
        </div>
        <div className="home-page-right">
          <LibraryHours />
          <LibraryCard />
          <ContactUs />
        </div>
      </div>
    </div>
  );
}
