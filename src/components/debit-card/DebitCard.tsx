import React, { useState } from "react";

import "./DebitCard.css";
import { cards } from "../../cards";
import type { Card } from "../../cards"

export const DebitCard: React.FC = () => {

	//	this is an example of how to use useState hook
	const cardList: Card[] = { ...cards };
	const [card, setCard] = useState({
		number: "",
		expiry: "",
		cvv: "",
		name: "",
		bank: "",
	});
	const onSelectCard = (e: number) => {
		const cardId = e;
		setCard(cards[cardId]);
	}

	console.log(cardList)


	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div className="card outlined" style={{ width: '1000px' }}>
				<div data-testid="debit-card">
					<h3 style={{ textAlign: 'center' }}>Card Details</h3>
					<br />
					<div className="debit-card-body" data-testid="debit-card-body"
					>
						<p className="debit-card-bank" data-testid="debit-card-bank-name">{card.bank}</p>
						<p className="debit-card-no" data-testid="debit-card-no">{card.number}</p>
						<br />
						<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
						<p>
							<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{card.name}</span>
							<span className="debit-card-date" data-testid="debit-card-expiry-date">{card.expiry}</span>
							<span className="debit-card-cvv" data-testid="debit-card-cvv">{card.cvv}</span></p>
					</div>
				</div>
				<div>
					<h3 style={{ textAlign: "center" }}>Cards List</h3>
					<div className="debit-card-list" data-testid="debit-card-list">
						{/* {
							cardList.map((card, index) =>
							(<div className="list-card" data-testid="list-card-2"
								onClick={() => onSelectCard(index + 1)}
							><p className="list-card-title">Card {index + 1}</p></div>))
						} */}
						<div className="list-card" data-testid="list-card-0"
							onClick={() => onSelectCard(1)}>
							<p className="list-card-title">Card 1</p>
						</div>
						<div className="list-card" data-testid="list-card-2"
							onClick={() => onSelectCard(2)}
						><p className="list-card-title">Card 2</p></div>
						<div className="list-card" data-testid="list-card-3"
							onClick={() => onSelectCard(3)} ><p className="list-card-title">Card 3</p></div>
						<div className="list-card" data-testid="list-card-4"
							onClick={() => onSelectCard(4)}><p className="list-card-title">Card 4</p></div>
						<div className="list-card" data-testid="list-card-4"
							onClick={() => onSelectCard(5)}><p className="list-card-title">Card 5</p></div>

					</div>
				</div>
			</div>
		</div>
	)
};
