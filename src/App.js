import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

require("dotenv").config();

function App() {
  // //const [name, setName] = useState('')
  // const [data, setData] = useState(null);

  // //const [formData, setFormData] = useState('');

  const APIkey = process.env.APIKEY;
  //const APIkey = '42d975d7005345e99c301800cd427463'

  // // const handleClick = async () => {
  // //   try {
  // //     const data = await (await fetch(`https://api.rawg.io/api/games?key=${APIkey}&search=${name}`)).json()
  // //       setData(data)
  // //   } catch (err) {
  // //       console.log(err.message)
  // //   }
  // // };

  // const handleSubmit=(e) =>
  // {
  //   try
  //   {
  //     e.preventDefault();
  //     const name=e.target.name.value;
  //     const data = fetch(`https://api.rawg.io/api/games?key=${APIkey}&search=${name}`).json()
  //     setData(data)
  //     .then(response => response.json())
  //     const title = document.createElement('p');
  //     title.innerText = data.results.slug;
  //   }
  //   catch (err)
  //   {
  //       console.log(err.message)
  //   }
  // };

  // return (
  //     <div className="App">
  //         <header className="App-header">
  //             Enter a game title to search:
  //                 <form onSubmit={handleSubmit}>
  //                 <input
  //                 type="text"
  //                 placeholder='Enter a title name'
  //                 name="name"
  //                 />
  //                 <button>Check Game</button>
  //                 </form>
  //                 <h1>Results</h1>
  //                 <p></p>
  //         </header>
  //     </div>
  // );

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://api.rawg.io/api/games?key=${APIkey}&search=${searchQuery}`);
      setSearchResults(response.data.results);
      console.table(response)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (

    <div className="App">
      <header className="App-header">
      Enter a game title to search:
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Enter name to search"
        />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <table>
            <tbody>
            {searchResults.map((result) => (
            <tr key={result.id}>
              <td>
                <p><img src={result.background_image}></img></p>
                <p>name: {result.name} | platform: {result.platforms.length > 0 ? result.platforms[0].platform.name : 'N/A' } | genre: {result.genres.length > 0 ? result.genres[0].name : 'N/A' }</p>
                <p>rating: {result.rating} | score: {result.score}</p>
                <p>released: {result.released}</p>
                <p>tags: {result.tags.length > 0 ? result.tags[0].name : 'N/A' } | {result.tags.length > 0 ? result.tags[0].language : 'N/A' }{result.tags.language}</p>
                </td>
            </tr>
            ))}
          </tbody>
          </table>
        </div>
      )}
      </header>
    </div>

  );

}

export default App;
