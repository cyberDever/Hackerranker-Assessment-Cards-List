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
  const [change, setChange] = useState(false);
  const data = cards;

  const handleCard = (param: number) => {
    setCard(data[param]);
    setVisible(true);
    setChange(false);
  };

  const numSeperate = (numStr: string): string[] => {
    let maskedNumber = numStr.slice(0, 4) + " XXXX XXXX XXXX";

    let fullNumber = "";
    for (let i = 0; i < 4; i++) {
      const segment = numStr.slice(4 * i, 4 * (i + 1));
      fullNumber += i !== 3 ? segment + " " : segment;
    }

    return [fullNumber, maskedNumber];
  };

  const [fullNumber, maskedNumber] = numSeperate(card.number);

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
              onClick={() => setChange(!change)}
            >
              <p className="debit-card-bank" data-testid="debit-card-bank-name">
                {card.bank}
              </p>

              <p className="debit-card-no" data-testid="debit-card-no">
                {change ? fullNumber : maskedNumber}
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
                  {change ? card.name : "XXXX XXXX"}
                </span>

                <span
                  className="debit-card-date"
                  data-testid="debit-card-expiry-date"
                >
                  {change ? card.expiry : "XX/XX"}
                </span>

                <span
                  className="debit-card-cvv"
                  data-testid="debit-card-cvv"
                >
                  {change ? card.cvv : "XXX"}
                </span>
              </p>
            </div>
          </div>
        )}

        <div>
          <h3 style={{ textAlign: "center" }}>Cards List</h3>

          <div className="debit-card-list" data-testid="debit-card-list">
            {cards.map((_, index) => (
              <div
                key={index}
                className="list-card"
                data-testid={`list-card-${index}`}
                onClick={() => handleCard(index)}
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
