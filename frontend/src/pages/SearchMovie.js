import React, { useState } from 'react';

function SearchMovie() {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    // Call your search function with the keyword
    console.log('Search for:', keyword);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for Movie"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchMovie;
