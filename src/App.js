import React from 'react'
import './App.css';

export async function getServerSideProps() {
  const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=1&size=10`);
  const initialData = await response.json();
  const data = initialData.data;

  return {
    props: { data },
  };
}

function App({ data }) {
  const [currData, setCurrData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    const fetchInitialData = async () => {
      const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=1&size=10`);
      const initialData = await response.json();
      const data = initialData.data;
      setCurrData(data);
    };

    fetchInitialData();
  }, []);


  const fetchNextPage = async () => {
    const nextPage = currentPage + 1;

    const response = await fetch(`https://api.instantwebtools.net/v1/passenger?page=${nextPage}&size=10`);
    const fetchedData = await response.json();
    const newData = fetchedData.data;

    setCurrData((prevData) => [...newData]);
    setCurrentPage(nextPage);
  };

  return (
    <div className = "app">
      <div className = "heading">Data of passengers along with thier id of booking</div>
      <div className = "content">
      <ul>
        {currData &&
          currData.map((item) => (
            <li key={item._id}>
              Name: {item.name}, ID: {item._id}
            </li>
          ))}
      </ul>
      <button className = "nxt_button" onClick={fetchNextPage}>View more</button>
      </div>
    </div>
  );
}

export default App;
