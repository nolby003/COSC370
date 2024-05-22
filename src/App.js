import './App.css';
import React, {useState} from 'react';
import axios from 'axios';

//require("dotenv").config();

function App() {

  const Apikey = '42d975d7005345e99c301800cd427463'

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://api.rawg.io/api/games?key=${Apikey}&search=${searchQuery}&platforms=${platform_options}`);
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
                <p><img alt='' src={result.background_image}></img></p>
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
