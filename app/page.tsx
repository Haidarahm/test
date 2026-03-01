import Cards from "./components/Cards";
import DetailsSection from "./components/DetailsSection";

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <section className="emigo-container h-screen flex flex-col ">
        <h1 className="title h-fit font-ibrand uppercase font-normal text-[84px] w-full text-center leading-[100%]">
          shop <br /> emigo <br /> container
        </h1>
        <div className="cards flex flex-1 w-full">
          <Cards />
        </div>
      </section>
      <DetailsSection/>
    </main>
  );
}
