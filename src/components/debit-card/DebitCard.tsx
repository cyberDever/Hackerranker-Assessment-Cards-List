import React, { useState } from "react";

import "./DebitCard.css";
import { cards } from "../../cards";
import type { Card } from "../../cards"

export const DebitCard: React.FC = () => {

	const [card, setCard] = useState<Card>(cards[0]);
	const [upName, setUpName] = useState<string>("");
	const [isCardSelected, setIsCardSelected] = useState<boolean>(false);

	// use zero-based index when selecting a card
	const onSelectCard = (index: number) => {
		setCard(cards[index]);
		setIsCardSelected(true);
	}

	const onClickCard = () => {	
		setSelect(!select);
		if(select){
			updateName(card.number);
		}
	}
	
	const updateName = (name: string) => {
		var upCard = name.slice(0,4);
		for(var i=4;i<name.length;i+=4){
			upCard += " " + name.slice(i,i+4);
		}
		setUpName(upCard);
	}

	const [select, setSelect] = useState<boolean>(true);

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div className="card outlined" style={{ width: '1000px' }}>
				{isCardSelected && (
					<div data-testid="debit-card">
						<h3 style={{ textAlign: 'center' }}>Card Details</h3>
						<br />
						<div className="debit-card-body" data-testid="debit-card-body"
						onClick={onClickCard}
						>
							<p className="debit-card-bank" data-testid="debit-card-bank-name">{card.bank}</p>
							<p className="debit-card-no" data-testid="debit-card-no">{select?card.number.slice(0,4) + " XXXX XXXX XXXX" : upName}</p>
							<br />
							<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
							<p>
								<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{select?"XXXX XXXX":card.name}</span>
								<span className="debit-card-date" data-testid="debit-card-expiry-date">{select?"XX/XX":card.expiry}</span>
								<span className="debit-card-cvv" data-testid="debit-card-cvv">{select?"XXX":card.cvv}</span></p>
						</div>
					</div>
				)}
				<div>
					<h3 style={{ textAlign: "center" }}>Cards List</h3>
					<div className="debit-card-list" data-testid="debit-card-list">
						{
							cards.map((c, index) => (
								<div key={c.number} className="list-card" data-testid={`list-card-${index}`} onClick={() => onSelectCard(index)}>
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
