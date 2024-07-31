import React, { useState,useContext } from "react";
import { CoinContext } from '../../context/CoinContext'
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
// import { motion } from "framer-motion";
// import StarOutlineIcon from "@mui/icons-material/StarOutline";
// import { saveItemToWatchlist } from "../../../functions/saveItemToWatchlist";
// import StarIcon from "@mui/icons-material/Star";
// import { removeItemToWatchlist } from "../../../functions/removeItemToWatchlist";

function Grid({ coin, delay }) {

    const{currency} = useContext(CoinContext);
//   const watchlist = JSON.parse(localStorage.getItem("watchlist"));
//   const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    <a href={`/coin/${coin.id}`}>
      <div
        className={`grid ${coin.price_change_percentage_24h < 0 && "grid-red"}`}
        // initial={{ opacity: 0, y: 50 }}
        // whileInView={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.5, delay: delay }}
      >
        <div className="img-flex">
          <img src={coin.image} className="coin-image" />
          <div className="icon-flex">
            <div className="info-flex">
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
            {/* <div
              className={`watchlist-icon ${
                coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
              }`}
              onClick={(e) => {
                if (isCoinAdded) {
                  // remove coin

                  removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                } else {
                  setIsCoinAdded(true);
                  saveItemToWatchlist(e, coin.id);
                }
              }}
            >
              {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
            </div> */}
          </div>
        </div>
        {coin.price_change_percentage_24h >= 0 ? (
          <div className="chip-flex">
            <div className="price-chip">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="chip-icon">
              <TrendingUpRoundedIcon />
            </div>
          </div>
        ) : (
          <div className="chip-flex">
            <div className="price-chip red1">
              {coin.price_change_percentage_24h.toFixed(2)}%
            </div>
            <div className="chip-icon red1">
              <TrendingDownRoundedIcon />
            </div>
          </div>
        )}
        {coin.price_change_percentage_24h >= 0 ? (
          <p className="current-price">
            {currency.symbol}{coin.current_price.toLocaleString()}
          </p>
        ) : (
          <p className="current-price-red">
            {currency.symbol}{coin.current_price.toLocaleString()}
          </p>
        )}
        <p className="coin-name">
          Total Volume : {coin.total_volume.toLocaleString()}
        </p>
        <p className="coin-name">
          Market Capital : {currency.symbol}{coin.market_cap.toLocaleString()}
        </p>
      </div>
    </a>
  );
}

export default Grid;