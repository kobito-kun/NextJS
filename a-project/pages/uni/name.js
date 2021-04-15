import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import styles from './table.module.css'
import Link from 'next/link';


function name() {

  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [countries, setCountries] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [selectCountry, setSelectCountry] = useState("");

  useEffect(() => {
    setResults(filterArraybyCountry(results, selectCountry));
  }, [selectCountry])
  
  const fetchRequest = () => {
    setClicked(true)
    axios.get(`http://universities.hipolabs.com/search?name=${input}`).then(res => {
        setResults(res.data)
        setCountries(makeUniqueViaArray(res.data))
      })
  }
  const filterArraybyCountry = (array, target) => {
    let output = [];
    array.forEach(obj => {if (obj.country === target) output.push(obj)})
    return output
  }
  const makeUniqueViaArray = (array) => {
	  let output = [];
    array.forEach(obj => { if (!output.includes(obj.country)) output.push(obj.country) })
	  return output;
  }  
  const handleChangedSelect = (e) => {
    setSelectCountry(e.target.value)
    setCountries([e.target.value])
  }
  const handleTextInput = (e) => {
    setInput(e.target.value)
  }
  const redirectPage = (site) => {
    window.open(site)
  }

  return (
    <div>
      <Head>
        <title>University Lookup > Name</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.1.1/tailwind.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      	<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <div className="min-h-screen flex flex-col duration-300 items-center justify-center bg-gradient-to-br from-pink-300 via-pink-500 to-pink-700">
        <div className="bg-white duration-300 rounded-lg shadow p-10 flex flex-col items-center justify-center">
          <div className="fixed top-0 right-0 p-4 font-bold text-white text-2xl">
            <Link href="/uni/country">
              <a className="mr-4">
                Country
              </a>
            </Link>
            <Link href="/uni/name">
              <a>
                Name
              </a>
            </Link>             
          </div>
          <div className="fixed top-0 left-0 p-4 font-bold text-white text-2xl">
            <Link href="/">
              <a>
                Kobi <i className="fab fa-github"></i>
              </a>
            </Link>
          </div>
        <h1 className="font-bold text-2xl text-center">University Lookup</h1>
        <p className="text-center">Searching by <span className="font-semibold">Name</span></p>
        <div className="my-4">
        <input className="border border-black px-4 py-2 rounded shadow" onChange={handleTextInput}></input>
        {countries.length > 0 ? "" : <button onClick={fetchRequest} className="py-2 px-4 bg-blue-500 rounded shadow font-bold text-white mx-4">Search</button>}
        {countries.length > 0 ? 
        <select onChange={handleChangedSelect} className="w-52 rounded shadow border border-black px-4 py-2 mx-4">
          {countries.map(e => (
            <option key={uuidv4()}>{e}</option>
            ))}
        </select>
        : ""}
      </div>
        <div>
      {results.length > 0 ? 
        <table id={styles.results}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
          {results.map(e => (
            <tr key={uuidv4()} className="cursor-pointer" onClick={() => redirectPage(e.web_pages[0])}>
              <td>{e.name}</td>
              <td>{e.country}</td>
            </tr>
          ))}
          </tbody>
        </table>
        :
        <div className="animate-pulse">
          {clicked ? "Loading..." : "Awaiting..."}
        </div>  
      }
        </div>
      </div>
      </div>
    </div>
  )
}

export default name
