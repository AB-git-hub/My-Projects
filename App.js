import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState(null);
  const [img, setImg] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [txt, setTxt] = useState(null);

  useEffect(() => {
    if (data) {
      console.log(data[0].type)
      console.log(data[0].type.split('/'))
      console.log(data[0].type.split('/')[1])
      if (data[0].type.split('/')[1] === ('jpeg' || 'png')) {
        setPdf(null)
        setTxt(null)
        setImg(URL.createObjectURL(data[0]))
      }
      else if (data[0].type.split('/')[1] === 'pdf') {
        setImg(null)
        setTxt(null)
        setPdf(URL.createObjectURL(data[0]))
      }
      else {
        var reader = new FileReader();

        reader.onload = function (e) {
          var content = e.target.result;
          //Here the content has been read successfuly
          setTxt(content);
          setImg(null)
          setPdf(null)
        }

        reader.readAsText(data[0]);
      }

    }


  }, [data])
  return (
    <div className="App">
      <h2> React js Display uploaded images </h2>
      <div>
        <label htmlFor="file"> Browse </label> <br />
      </div>
      <div>
        <input type="file" id="file" onChange={(e) => setData(e.target.files)} /> <br />
      </div>
      {img && <img src={img} alt="uhbhn" height={200} />}
      {pdf && <iframe src={pdf} title="a pdf" height={200} />}
      {txt && <p>{txt} </p>}

    </div>
  );
}

export default App;
