import { gql, useQuery } from "@apollo/client";
import React from "react";
import "./App.css";

interface Block {
  __typename: string;
  height: number;
  transactionCount: number;
}

const BITCOIN_BLOCK = gql`
  query data {
    bitcoin {
      blocks(options: { limit: 5, desc: "height" }) {
        height
        transactionCount
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(BITCOIN_BLOCK);
  console.log(data.bitcoin.blocks);
  return (
    <div className="App">
      <div>
        {data.bitcoin.blocks.map((b: Block) => {
          return (
            <div>
              <p>
                transaction count of block number <b>{b.height}</b>:{" "}
                {b.transactionCount}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
