import React, { useState } from "react";
import "./DebitCard.css";
import { cards } from "../../cards";
import type { Card } from "../../cards";

export const DebitCard: React.FC = () => {
    const [selCardId, setSelCardId] = useState<number | null>(null);
    const [visible, setVisible] = useState<boolean>(false);
    const selCardData: any = selCardId !== null ? cards[selCardId] : null;
    let bank, number, cvv, expiry, name;

    const handleCardClick = (index: number) => {
        setSelCardId(index);
        setVisible(false);
    }

    if (selCardData) {
        // selCardData = cards[selCardId];
        ({ bank, number, cvv, expiry, name } = selCardData);

        if (!visible) {
            number = number.slice(0, 4) + " XXXX XXXX XXXX";
            cvv = "XXX"
            expiry = "XX/XX"
            name = name.split(" ").map(() => "XXXX ");
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
                    selCardData && (
                        <div data-testid="debit-card"
                            onClick={() => setVisible(!visible)} >
                            <h3 style={{ textAlign: 'center' }}>Card Details</h3>
                            <br />
                            <div className="debit-card-body" data-testid="debit-card-body"
                            >
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
                                    onClick={() => handleCardClick(index)}
                                >
                                    <p className="list-card-title">Card {index + 1}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}


