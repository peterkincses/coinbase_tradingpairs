Setup steps:

1. Clone the repo
2. Run `yarn install`
3. Run `yarn start`

- showing latest coinbase crypto trade tickers based on the selected trade pairs
- default trade pair is ETH-USD
- for demo, I recommend selecting high frequency trade pairs, ie BTC-USD, ADA-USD, ETH-USD etc
- used react-select to replace standard select. react-select allows for filtering instead of scrolling
  the long list
- used react-use-websocket for its ease of use managing websocket subscribe/unsubscribe actions
- added a 100ms delay in updating the tickers, with BTC-USD/ETH-USD etc, layout trashing is too
  noticable otherwise

<img width="785" alt="Screenshot 2024-03-05 at 01 32 54" src="https://github.com/peterkincses/immix/assets/4365665/f3547d85-75d9-48ae-a800-11d6d256a48d">


  
