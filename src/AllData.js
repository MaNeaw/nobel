import React, { useEffect, useState } from "react";

const LoadingText = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    fetch(`https://api.nobelprize.org/2.1/nobelPrizes`)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData.nobelPrizes);
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <tbody>
        <tr>
          <th>categoryFullName</th>
          <th>Award Year</th>
          <th>Laureates</th>
          <th>Motivation</th>
        </tr>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.categoryFullName.en}</td>
            <td>{item.awardYear}</td>
            <td>
              {item.laureates.map((data_L) => (
                <div key={data_L.id}>
                 {" -- "} {data_L.fullName ? data_L.fullName.en : data_L.orgName.en}
                </div>
              ))}
            </td>
            <td>
              {item.laureates.map((data_L) => (
                <div key={data_L.id}>{" -- "}{data_L.motivation.en}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
};

export default LoadingText;
