import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Grid } from '@mui/material';

export default function SearchProduct({setSearchResults}) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': window.csrfToken,
          },
          body: JSON.stringify({ query: searchQuery }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //Passes the search query results to search results page
        navigate('/search', { state: { searchResults: data, searchQuery: searchQuery } });
      } catch (error) {
        console.error('An error occurred while fetching search results:', error);
      }
    } else {
      //Prompts the user to enter a search query before submitting a blank search
      alert('Please enter a search query');
    }
  };

return(
    <form onSubmit={handleSearchSubmit}>
                        <InputBase
                            placeholder="Search…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Button type="submit" color="inherit">
                            <SearchIcon />
                        </Button>
    </form>
    )
}
