import Cards from "./components/Cards";
import DetailsSection from "./components/DetailsSection";
export default function Home() {
  return (
    <main className="flex flex-col  gap-12 w-full items-center justify-center">
      <div className="mx-auto container">
      <Cards />
      <DetailsSection/>
      </div>
    
    </main>
  );
}
