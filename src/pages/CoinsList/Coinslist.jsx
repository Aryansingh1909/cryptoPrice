import React, { useState, useEffect,useContext } from 'react';
import Grid from '../../components/Grid/Grid';
import './Coinlist.css'
import { CoinContext } from '../../context/CoinContext';

const Coinlist = () => {
  const{currency,setCurrency} = useContext(CoinContext);
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const coinsPerPage = 10;

  useEffect(() => {
    fetchCoins();
    setCurrency(currency);

  }, [currentPage,currency]); // Fetch coins whenever currentPage changes

  const fetchCoins = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&ids=bitcoin&category=layer-1&per_page=${coinsPerPage}&page=${currentPage}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      
      <div className='grid-flex'>
        {coins.map((coin,i) => (
          <Grid coin={coin} key={i} delay={(i % 4) * 0.2}/>
        ))}
      </div>
      <div className='page-hover'>
        {/* Pagination buttons */}
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className='pagination-button'>
          Previous
        </button>
        <button onClick={() => handlePageChange(currentPage + 1)} className='pagination-button'>Next</button>
      </div>
    </div>
  );
};

export default Coinlist;
