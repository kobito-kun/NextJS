import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import axios from 'axios';
import styles from './table.module.css'

function country() {

  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
 
  useEffect(() => {
      axios.get(`http://universities.hipolabs.com/search?country=${input}`).then(res => {
        setResults(res.data)
      })
  }, [input])

  const handleChangedText = (e) => {
    if(e.target.value.length > 0){
      setInput(e.target.value)
    }
  }

  return (
    <div>
      <Head>
        <title>University Lookup > Name</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.1.1/tailwind.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl">University Lookup</h1>
        <p>Searching by <span className="font-semibold">Country</span></p>
        <div>
          <input className="border border-black px-4 py-2 rounded shadow" onChange={handleChangedText}></input>
          {input.length > 0 ? 
          <select>
            {results.map(e => (
              
            ))}
          </select>
        
        }
        </div>
        <div>
      {input.length > 0 ? 
        <table id={styles.results}>
          <tr>
            <th>Name</th>
            <th>Country</th>
          </tr>
          {results.map(e => (
            <tr>
              <td>{e.name}</td>
              <td>{e.country}</td>
            </tr>
          ))}
        </table>
        :
        <div>
        </div>  
      }
        </div>
      </div>
    </div>
  )
}

export default country
