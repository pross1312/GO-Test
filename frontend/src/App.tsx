import { useState } from "react"
import Detail from "./pages/Detail";
import Rank from "./pages/Rank";
import Report from "./pages/Report";
import Loading from "./components/loading";

function App() {
  const [isLoading, setLoading] = useState(false);
  const pages = [
    { name: "Search Scores", component: <Detail setLoading={setLoading}/> },
    { name: "Reports", component: <Report setLoading={setLoading}/> },
    { name: "Rank", component: <Rank setLoading={setLoading}/> },
  ];
  const [currentPage, setPage] = useState(0);
  return (
    <div className="home">
      <div className="nav">
        <h2 style={{textAlign: "center", color: "white"}}>Menu</h2>
        {
          pages.map((value, index) =>
            <span key={index} className={"link " + (value.name === pages[currentPage].name ? "current" : "")}
                  onClick={() => setPage(index)}>{pages[index].name}</span>
          )
        }
      </div>
      <div className="right-part">
          <Loading visible={isLoading}/>
          <div style={{visibility: isLoading ? "hidden" : "visible"}} className="page">
            {pages[currentPage].component}
          </div>
      </div>
    </div>
  )
}

export default App
