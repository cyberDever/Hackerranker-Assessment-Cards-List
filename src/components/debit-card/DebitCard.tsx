import React, { useState } from "react";

import "./DebitCard.css";
import { cards } from "../../cards";
import type { Card } from "../../cards"

export const DebitCard: React.FC = () => {

	const [cardId, setCardId] = useState<number>(0);
	const [isCardClicked, setIsCardClicked] = useState<boolean>(false);
	const [isShowCard, setIsShowCard] = useState<boolean>(false);

	function intialCardInfo(card: Card) {
		return {
			...card,
			number: card.number.slice(0, 4) + " XXXX XXXX XXXX",
			name: "XXXX XXXX",
			expiry: "XX/XX",
			cvv: "XXX"
		};
	}

	function changeStringFormat(str: string) {
		let formattedStr = "";
		for(let i = 4; i <= str.length; i = i + 4) {
			if(i === str.length) {
				formattedStr += str.slice(i - 4, i);
			} else {
				formattedStr += str.slice(i - 4, i) + " ";
			}
		}
		return formattedStr;
	}
	const showCardInfo = isCardClicked ? {
		...cards[cardId],
		number: changeStringFormat(cards[cardId].number)
	} : intialCardInfo(cards[cardId]);

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center" >
			<div className="card outlined" style={{ width: '1000px' }}>
				{isShowCard ? 
				(<div data-testid="debit-card" onClick={() => {
					setIsCardClicked(!isCardClicked);
				}}>
					<h3 style={{ textAlign: 'center' }}>Card Details</h3>
					<br />
					<div className="debit-card-body" data-testid="debit-card-body"
					>
						<p className="debit-card-bank" data-testid="debit-card-bank-name">{showCardInfo.bank}</p>
						<p className="debit-card-no" data-testid="debit-card-no">{showCardInfo.number}</p>
						<br />
						<div style={{ height: '45px', backgroundColor: 'black' }} className="debit-card-stripe"></div>
						<p>
							<span className="debit-card-holder-name" data-testid="debit-card-holder-name">{showCardInfo.name}</span>
							<span className="debit-card-date" data-testid="debit-card-expiry-date">{showCardInfo.expiry}</span>
							<span className="debit-card-cvv" data-testid="debit-card-cvv">{showCardInfo.cvv}</span></p>
					</div>
				</div>) : <></>
				}
				
				<div>
					<h3 style={{ textAlign: "center" }}>Cards List</h3>
					<div className="debit-card-list" data-testid="debit-card-list">
						{cards.map((card, index) => {
							return (<button key={index} className="list-card" data-testid={`list-card-${index}`}
							onClick={() => {
								setCardId(index);
								setIsCardClicked(false);
								setIsShowCard(true);
							}}>
							<p className="list-card-title">Card {index + 1}</p>
						</button>);
						})};
					</div>
				</div>
			</div>
		</div>
	)
};
