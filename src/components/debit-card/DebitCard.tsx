import React, { useState } from "react";

import "./DebitCard.css";
import { cards } from "../../cards";
import type { Card } from "../../cards";

export const DebitCard: React.FC = () => {

	const [isButtonClicked, setIsButtonClicked] = useState(false);
	const [isCardClicked, setIsCardClicked] = useState(false);
	const [cardId, setCardId] = useState(0);
	
	function stringFormat(str: string) {
		let strr: string = "";
		for (let i = 4; i <= str.length; i += 4) {
			i === 4 ?
				strr += str.slice(0, 4) :
				strr += " " + str.slice(i - 4, i);
		}
		return strr;
	}
	
	function formatCardDetails(card: Card) {
		let formattedCard: Card = {
			...card,
			number: card.number.slice(0, 4) + " XXXX XXXX XXXX",
			name: "XXXX XXXX",
			expiry: "XX/XX",
			cvv: "XXX"
		};
		return formattedCard;
	}
	
	let showDetails = !isCardClicked ? formatCardDetails(cards[cardId]) : {...cards[cardId], number: stringFormat(cards[cardId].number)};
	
	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div className="card outlined" style={{ width: '1000px' }}>
				{ isButtonClicked ? (<div data-testid="debit-card" onClick={() => {
					setIsCardClicked(!isCardClicked);
				}}>
					<h3 style={{ textAlign: 'center' }}>Card Details</h3>
					<br />
					<div className="debit-card-body" data-testid="debit-card-body"
					>
						<p className="debit-card-bank" data-testid="debit-card-bank-name">{showDetails.bank}</p>
						<p className="debit-card-no" data-testid="debit-card-no">{showDetails.number}</p>
						<br />
						<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
						<p>
							<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{showDetails.name}</span>
							<span className="debit-card-date" data-testid="debit-card-expiry-date">{showDetails.expiry}</span>
							<span className="debit-card-cvv" data-testid="debit-card-cvv">{showDetails.cvv}</span></p>
					</div>
				</div>) : (<></>) }
				<div>
					<h3 style={{ textAlign: "center" }}>Cards List</h3>
					<div className="debit-card-list" data-testid="debit-card-list">
						{cards.map((card: Card, index: number) => {
							return (
								<div key={index} className="list-card" data-testid={`list-card-${index}`}
									onClick={() => {
										setIsButtonClicked(true);
										setCardId(index);
										setIsCardClicked(false);
									}}>
									<p className="list-card-title">Card {index + 1}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	)
};
