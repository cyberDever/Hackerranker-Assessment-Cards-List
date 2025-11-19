import React, { useState } from "react";
import "./DebitCard.css";
import { cards } from "../../cards";

export const DebitCard: React.FC = () => {
    const [selectedCardId, setSelectedCardId] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);
    const selectedCard = typeof selectedCardId === "number" ? cards[selectedCardId] : null;
    let bank, number, cvv, expiry, name;

    if (selectedCard) {
        const selectedCard = cards[selectedCardId];
        ({ bank, number, cvv, expiry, name } = selectedCard);
        if (!isVisible) {
            number = number.slice(0, 4) + " XXXX XXXX XXXX";
            cvv = "XXX";
            expiry = "XX/XX";
            name = name.split(" ").map(() => "XXXX").join(" ");
        } else {
            let cardNumber = number.slice(0, 4);
            for (let i = 1; i < 4; i++) {
                cardNumber += " " + number.slice(i * 4, (i + 1) * 4);
            }
            number = cardNumber;
        }
    }

    return (
        <div className="mt-50 layout-column justify-content-center align-items-center" >
            <div className="card outlined" style={{ width: '1000px' }}>
                {
                    selectedCard && (
                        <div data-testid="debit-card" onClick={() => setIsVisible(!isVisible)}>
                            <h3 style={{ textAlign: 'center' }}>Card Details</h3>
                            <br />
                            <div className="debit-card-body" data-testid="debit-card-body">
                                <p className="debit-card-bank" data-testid="debit-card-bank-name">{bank}</p>
                                <p className="debit-card-no" data-testid="debit-card-no">{number}</p>
                                <br />
                                <div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
                                <p>
                                    <span className="debit-card-holder-name" data-testid="debit-card-holder-name">{name}</span>
                                    <span className="debit-card-date" data-testid="debit-card-expiry-date">{expiry}</span>
                                    <span className="debit-card-cvv" data-testid="debit-card-cvv">{cvv}</span></p>
                            </div>
                        </div>
                    )
                }
                <div>
                    <h3 style={{ textAlign: "center" }}>Cards List</h3>
                    <div className="debit-card-list" data-testid="debit-card-list">
                        {
                            cards.map((card, index) => (
                                <div
                                    className="list-card"
                                    data-testid={`list-card-${index}`}
                                    onClick={() => {
                                        setSelectedCardId(index);
                                        setIsVisible(false);
                                    }}>
                                    <p className="list-card-title">Card {index + 1}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};
