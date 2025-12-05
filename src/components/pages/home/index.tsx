import HomeActions from "./home_actions";
import LandingScreen from "./landing_screen";
export default function HomePage() {
  return (
    <div className="overflow-hidden h-screen">
      <HomeActions />
      <LandingScreen />
    </div>
  );
}
