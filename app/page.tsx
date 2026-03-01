import Cards from "./components/Cards";

export default function Home() {
  return (
    <main>
      <section className="emigo-container h-screen flex flex-col">
        <h1 className="title h-fit font-ibrand uppercase font-normal text-[80px] w-full text-center leading-[100%]">
          shop <br /> emigo <br /> container
        </h1>
        <div className="cards flex flex-1 w-full">
          <Cards />
        </div>
      </section>
      <section className="emigo-technology h-screen"></section>
    </main>
  );
}
