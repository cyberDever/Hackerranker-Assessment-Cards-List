import React, { useState } from "react";

import "./DebitCard.css";
import { cards } from "../../cards";

export const DebitCard: React.FC = () => {
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
    bank: "",
  });
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const data = cards;

  const handleCard = (param: number) => {
    setCard(data[param]);
  };
  const numSeperate = (numStr: string): string[] => {
    let originStr: string = "";
    let hoveredStr: string = "";

    originStr = numStr.slice(0, 4) + " XXXX XXXX XXXX";
    // hoveredStr = numStr.slice(0, 4) (4, 8) (8, 12) (12, 16)
    for (let i = 0; i < 4; i++) {
      i !== 3
        ? (hoveredStr += numStr.slice(4 * i, 4 * (i + 1)) + " ")
        : (hoveredStr += numStr.slice(4 * i, 4 * (i + 1)));
    }

    return [hoveredStr, originStr];
  };

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "1000px" }}>
        {visible && (
          <div data-testid="debit-card">
            <h3 style={{ textAlign: "center" }}>Card Details</h3>
            <br />
            <div
              className="debit-card-body"
              data-testid="debit-card-body"
              onClick={() => setHover(!hover)}
            >
              <p className="debit-card-bank" data-testid="debit-card-bank-name">
                {card.bank}
              </p>
              <p className="debit-card-no" data-testid="debit-card-no">
                {hover === true
                  ? numSeperate(card.number)[0]
                  : numSeperate(card.number)[1]}
              </p>
              <br />
              <div
                style={{ height: "45px", backgroundColor: "black" }}
                className="debit-card-stripe"
              ></div>
              <p>
                <span
                  className="debit-card-holder-name"
                  data-testid="debit-card-holder-name"
                >
                  {hover === true ? card.name : "XXXX XXXX"}
                </span>
                <span
                  className="debit-card-date"
                  data-testid="debit-card-expiry-date"
                >
                  {hover === true ? card.expiry : "XX/XX"}
                </span>
                <span className="debit-card-cvv" data-testid="debit-card-cvv">
                  {hover === true ? card.cvv : "XXX"}
                </span>
              </p>
            </div>
          </div>
        )}
        <div>
          <h3 style={{ textAlign: "center" }}>Cards List</h3>
          <div className="debit-card-list" data-testid="debit-card-list">
            {cards.map((c, index) => (
              <div
                key={index}
                className="list-card"
                data-testid={`list-card-${index}`}
                onClick={() => {
                  handleCard(index);
                  setVisible(true);
                  setHover(false);
                }}
              >
                <p className="list-card-title">{`Card ${index + 1}`}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
