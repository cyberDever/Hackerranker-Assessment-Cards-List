import React, { useState } from "react";

import "./DebitCard.css";
import { cards } from "../../cards";

export const DebitCard: React.FC = () => {
	const data = cards;
	const [card, setCard] = useState({
		bank: "",
		number: "",
		name: "",
		expiry: "",
		cvv: ""
	})
	const [visible, setVisible] = useState(false);
	const [click, setClick] = useState(false);

	const handleCard = (key: number) => {
		setCard(data[key]);
	}
	const changeCardNumber = (param: string) => {
		let cardNumber = "";
		cardNumber = param.slice(0, 4) + " XXXX XXXX XXXX"
		return cardNumber;
	}
	const addSpaceNumber = (param: string): string => {
		let spaceNumber: string = "";
		for (let i = 4; i <= param.length; i += 4) {
			if (i < param.length) {
				spaceNumber += param.slice(i - 4, i) + " ";
			} else {
				spaceNumber += param.slice(i - 4, i);
			}
		}
		// spaceNumber = param.slice(0, 4) + " " + param.slice(4, 8) + " " + param.slice(8, 12) + " " +param.slice(12, 16);
		return spaceNumber;
	}

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div className="card outlined" style={{ width: '1000px' }}>
				{visible &&
					<div data-testid="debit-card">
						<h3 style={{ textAlign: 'center' }}>Card Details</h3>
						<br />
						<div className="debit-card-body" data-testid="debit-card-body"
							onClick={() => {
								setClick(!click)
							}}
						>
							<p className="debit-card-bank" data-testid="debit-card-bank-name">{card.bank}</p>
							<p className="debit-card-no" data-testid="debit-card-no">{click ? addSpaceNumber(card.number) : changeCardNumber(card.number)}</p>
							<br />
							<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
							<p>
								<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{click ? card.name : "XXXX XXXX"}</span>
								<span className="debit-card-date" data-testid="debit-card-expiry-date">{click ? card.expiry : "XX/XX"}</span>
								<span className="debit-card-cvv" data-testid="debit-card-cvv">{click ? card.cvv : "XXX"}</span></p>
						</div>
					</div>
				}

				<div>
					<h3 style={{ textAlign: "center" }}>Cards List</h3>
					<div className="debit-card-list" data-testid="debit-card-list">
						{cards.map((a, index) => {
							return (
								<div
									key={index}
									className="list-card"
									data-testid={`list-card-${index}`}
									onClick={() => {
										setVisible(true);
										setClick(false)
										handleCard(index);
									}}
								>
									<p className="list-card-title">{`Card ${index + 1}`}</p>
								</div>
							)
						})}

					</div>
				</div>
			</div>
		</div>
	)
};
