import {useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import { css } from '@emotion/css/macro';
import styled from '@emotion/styled';
import { screenSizes } from '../assets/screenSizes';
import PropTypes from 'prop-types';
import useResizeAware from 'react-resize-aware';
import {FaSearch, FaRegHandPointer, FaRegEnvelope, FaFilm, FaRegFileAlt} from 'react-icons/fa';
import {Link} from 'react-router-dom';

import Typing from './generic/Typing';
import {vwContentIdx} from '../assets/apisimul/serverdata_main';
import Publication from './generic/Publication';
import {searchTypingSelector, searchQuerySelector} from '../atoms';

// #region constants
const SECTION_BACKGROUND = '#f5f5f5';
const SECTION_BORDER = '#e8e8e8';
const INPUT_BACKGROUND = '#fff';
const INPUT_BORDER = '1px solid rgb(209,209,209)';
const INPUT_PLACEHOLDER = 'Looking for answer? Just start typing a search term!';
const INPUT_PLACEHOLDER_PHONE = 'Need answer? Type a search term!';

const initState = {
	data: [],
}
// #endregion

// #region styled-components
const Section = styled.section`
	width: 100vw;
	background: ${SECTION_BACKGROUND};
    padding: 25px 0;
    border-top: 1px solid ${SECTION_BORDER};
    border-bottom: 1px solid ${SECTION_BORDER};
	display: flex;
	justify-content: center;
`;

const Input = styled.input`
	width: 65%;
	background: ${INPUT_BACKGROUND};
	color: #595959;
	font-size: 16px;
	padding: 20px 25px;
	padding-left: 5vw;
	border: ${INPUT_BORDER};
	box-shadow: none;
	position: relative;
	outline: 0;
	border-radius: 10vw;
	box-sizing: border-box;

	@media (max-width: ${screenSizes.largeTablet}) {
		padding-left: 7vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 80%;
		padding-left: 9vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		padding-right: 0;
		padding-left: 11vw;
		width: 90%;
	}
`;

const searchIco = css`
	display: flex;
    align-items: center;
    border: none;
    background: none;
    position: relative;
    left: 4%;
    font-size: 1.3vw;
	z-index: 1;
	color: #45454C;

	@media (max-width: ${screenSizes.largeTablet}) {
		left: 5%;
		font-size: 2vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		left: 7%;
		font-size: 3vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		left: 10%;
		font-size: 5vw;
	};
`;

const TypeAnim = css`
	display: flex;
    align-items: center;
    width: 3vw;
    position: absolute;
    left: 79%;
    top: 13.8vw;

	@media (max-width: 1270px) {
		width: 3.2vw;
        left: 77%;
		top: 14.8vw;
	};

	@media (max-width: 1020px) {
		width: 4vw;
		left: 75%;
		top: 16.3vw;
	};

	@media (max-width: ${screenSizes.largeTablet}) {
		width: 5vw;
		top: 19vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		width: 6vw;
		left: 80%;
		top: 36vw;
	};

	@media (max-width: 538px) {
		width: 8vw;
		left: 78%;
		top: 38vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		width: 9vw;
		left: 82%;
		top: 48vw;
	};

	@media (max-width: 350px) {
		width: 11vw;
		top: 51vw;
	};
`;

const liveSearchContainer = css`
	position: absolute;
    width: 63%;
    background-color: #fffdd2;
    border: 1px solid rgb(209,209,209);
    left: 20%;
    top: 15.5vw;
	box-sizing: border-box;
	padding: 0;
	font-family: "Open Sans",Helvetica,Arial,sans-serif;
	max-height: 55%;
    overflow-y: scroll;
	overflow-x: hidden;

	& > li {
		display: flex;
		align-items: center;
		list-style: none;
		padding: 0.8% 2%;
		color: #45454C;
	};

	@media (max-width: 1270px) {
		top: 17vw;
		left: 20.8%;
		width: 61%;
	};
	@media (max-width: 1020px) {
		top: 19vw;
		left: 21%;
		width: 60.7%;
	};
	@media (max-width: ${screenSizes.largeTablet}) {
		top: 22vw;
		left: 21.5%;
		width: 60.5%;
		max-height: 70%;
	};
	@media (max-width: ${screenSizes.mediumTablet}) {
		top: 39.4vw;
		left: 15.5%;
		width: 74.5%;
	};
	@media (max-width: 538px) {
		top: 43.5vw;
		left: 16.5%;
		width: 72%;
		padding: 2% 3%;
	};
	@media (max-width: ${screenSizes.smartPhones}) {
		top: 53.5vw;
		left: 13.5%;
		width: 81%;
	};
	@media (max-width: 350px) {
		top: 59vw;
		left: 15.5%;
		width: 77%;
	};
`;

const keepTypeTip = css`
	justify-content: center;
	color: #a03717 !important;
	gap: 1%;

	@media (max-width: 538px) {margin-bottom: 3vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 3.2vw};
	@media (max-width: 350px) {font-size: 3.6vw};
`;

const contactLiveSearch = css`
	background-color: #e6e28f;
	gap: 3%;

	@media (max-width: 1270px) {font-size: 1.2vw};
	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.5vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.3vw};
	@media (max-width: 538px) {font-size: 2.7vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 3.2vw};
	@media (max-width: 350px) {font-size: 3.6vw};
`;

const btnLiveSearchContact = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 7%;
	width: 10%;
	background-color: #a03717;
	color: #fff;
	text-decoration: none;
	padding: 0.5% 0.8%;
	border-radius: 1vw;
	box-sizing: border-box;

	@media (max-width: 1270px) {width: 14%};
	@media (max-width: ${screenSizes.largeTablet}) {width: 16%};
	@media (max-width: ${screenSizes.mediumTablet}) {width: 20%};
	@media (max-width: 538px) {width: 30%};
	@media (max-width: 350px) {width: 40%};

	&:hover {
		background-color: #4a4a4a;
	};
`;

const liveSearchItm = css`
	display: flex;
	flex-direction: column;

	&:hover {
		background-color: #e6cc8f;
		color: #a03717;
	};

	& > div {
		width: 100%;
	};

	@media (max-width: 538px) {
		margin-bottom: 1.4vw;
	}
`;

const liveSearchItmCategory = css`
	font-style: italic;
	font-size: 0.8vw;
	color: #878787;
	padding-left: 3.5vw;

	@media (max-width: 1270px) {
		font-size: 0.9vw;
		padding-left: 4vw;
	};

	@media (max-width: ${screenSizes.largeTablet}) {
		font-size: 1.2vw;
		padding-left: 6vw;
	};

	@media (max-width: ${screenSizes.mediumTablet}) {
		font-size: 1.7vw;
		padding-left: 7vw;
	};

	@media (max-width: 538px) {
		font-size: 2.3vw;
		padding-left: 11vw;
	};

	@media (max-width: ${screenSizes.smartPhones}) {
		font-size: 2.8vw;
		padding-left: 13vw;
	};

	@media (max-width: 350px) {
		font-size: 3.4vw;
		padding-left: 15vw;
	};
`;

const publication = css`
	display: flex;
	flex-direction: row;
	gap: 0.5vw;

	@media (max-width: ${screenSizes.largeTablet}) {gap: 1vw};
	@media (max-width: 538px) {
		gap: 2vw;
	};
`;

const publicationIcon = css`
	font-size: 1.3vw;

	@media (max-width: 1270px) {font-size: 1.5vw};
	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.8vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.5vw};
	@media (max-width: 538px) {font-size: 3.6vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 4.2vw};
	@media (max-width: 350px) {font-size: 5.2vw};
`;

const publicationTitle = css`
	@media (max-width: 1270px) {font-size: 1.2vw};
	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.5vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.3vw};
	@media (max-width: 538px) {font-size: 2.7vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 3.2vw};
	@media (max-width: 350px) {font-size: 3.6vw};
`;
// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *  This is components compound. In addition to form component itself contains:
 *  - <TypingAnimation> component: displays while user typing a search query. Two seconds
 *   after user stops typing this component has to be hidden again
 *  - <QueryLiveSearch>: a box displaying search results while user typing a                                  query.  
 *  - <LiveSearchItem> component: displays a position inside QueryLiveSearch corresponds to item being found
 *  - <ContactInvite>: default nested "search result" contains proposition for user to fill contact form
 */
const TypingAnimation = () => {
	return <div className={TypeAnim}><Typing /></div>
};

const ContactInvite = () => {
	const [, setIsTyping] = useRecoilState(searchTypingSelector);
	const [, setSearchQuery] = useRecoilState(searchQuerySelector);

	const handleClick = () => {
		setIsTyping(false);
		setSearchQuery("");
		document.getElementById('search-field').value="";
	};

	return (
		<li className={contactLiveSearch}>
			Steel haven't an answer after few queries? 
			<Link onClick={handleClick} className={btnLiveSearchContact} to="/contact">
				<FaRegEnvelope />
				<div>Ask Us!</div>
			</Link>
		</li>
	)
};

const LiveSearchItem = ({content, category}) => {
	return (
		<li className={liveSearchItm}>
			<Publication 
				title = {content.title} 
				cssLookup = {{
					container: publication,
					title: publicationTitle,
				}}>
				{
					content.video ?
					<FaFilm className={publicationIcon} />
					: <FaRegFileAlt className={publicationIcon}	/>
				}
			</Publication>
			<div className={liveSearchItmCategory}>Category: {category}</div>
		</li>
	);
};

const QueryLiveSearch = ({data}) => {
	const isTyping = useRecoilValue(searchTypingSelector);

	return (
		<ul className={liveSearchContainer}>
			{isTyping && <li className={keepTypeTip}><FaRegHandPointer /> Keep typing for live search results...</li>}
			{
				!data.length ? <li>--- No results found ---</li> 
				: data.map((category) => category.view.map((article) => <LiveSearchItem content={article} category={category.category} />))
				
			}
			<ContactInvite />
		</ul>
	)
};

const SearchForm = () => {
	const [resizeListener, sizes] = useResizeAware();
	const [appState, setAppState] = useState(initState);
	const [isLoading, setIsLoading] = useRecoilState(searchTypingSelector);
	const [searchQuery, setSearchQuery] = useRecoilState(searchQuerySelector);

	const delayStateLoadingFalse = (delay) => {
		setTimeout(() => setIsLoading(false), delay);
    };

	const handleType = ({target}) => {
		setIsLoading(true);
		setSearchQuery(target.value);

		// Getting filtered articles
		if (target.value) {
			let dataQueried = vwContentIdx.reduce(
				(acc, itm) => {
					let results = itm.view.filter(
						(article) => article.title.toLowerCase().includes(target.value.toLowerCase())
					);
					results.length && acc.push({
						category: itm.category,
						view: results,
					});
					return acc;
				}
			,[]);
			// console.log(dataQueried);
			setAppState(appSt => ({...appSt, data: dataQueried}));
		} else {
			setAppState(appSt => ({...appSt, data: []}));
		};

		delayStateLoadingFalse(2000);
	}

	return <Section>
		{resizeListener}
		<button className={searchIco} type="submit" disabled><FaSearch /> </button>	
		<Input
			id="search-field"
			placeholder={
				sizes.width <= parseInt(screenSizes.mediumTablet) ? INPUT_PLACEHOLDER_PHONE : INPUT_PLACEHOLDER
			}
			onChange={handleType}
		/>
		{ isLoading && <TypingAnimation /> }
		{ searchQuery && <QueryLiveSearch data={appState.data} />}
	</Section>;
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;
// #endregion

export default SearchForm;