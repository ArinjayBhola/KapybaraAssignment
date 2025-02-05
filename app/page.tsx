import Header from "./_components/Header";
import CardContainer from "./_components/CardContainer";
import Sidebar from "./_components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col">
        <Header />
        <CardContainer />
      </div>
    </div>
  );
}
