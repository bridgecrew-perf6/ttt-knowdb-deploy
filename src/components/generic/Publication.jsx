import React from 'react';
import PropTypes from 'prop-types';
import {useRecoilValue} from 'recoil';
import { cx, css } from '@emotion/css/macro';
import {FaFolder, FaRegFileAlt, FaFilm, FaRegStar, FaBell} from 'react-icons/fa';
import {publicationSelector} from '../../atoms';
import {screenSizes} from '../../assets/screenSizes';


// #region constants

// #endregion

// #region styled-components
const homeContentPublication = css`
	width: 100%;
	display: flex;
	padding-left: 10%;
	color: #45454C;
	margin-bottom: 0.8vw;
	align-items: center;
	gap: 2%;

	@media(max-width: ${screenSizes.largeTablet}) {
		padding-left: 5%;
		margin-bottom: 1.8vw;
	};
`;

const homeContentPubTitle = css`
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 0.85vw;
    font-weight: 400;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.6vw;
		line-height: 2.2vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2vw;
		line-height: 3.1vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.2vw;
		line-height: 5.1vw;
	};
`;

const homeContentPubLogo = css`
	font-size: 1.5vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 2.3vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 4.2vw;
	}
`;

const homeContentSubLogo = css`
	font-size: 1vw;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.9vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.5vw;
	}
`;

const cssSidePublication = css`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 2%;
	color: #45454C;
	margin-bottom: 0.8vw;
`;

const cssSidePubTitle = css`
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
    font-size: 0.8vw;
    font-weight: 400;

	@media(max-width: ${screenSizes.largeTablet}) {
		font-size: 1.3vw;
		line-height: 1.75vw;
	};

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.3vw;
		line-height: 4.75vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 2.8vw;
		line-height: 5.75vw;
	}
`;

const cssSidePubLogo = css`
	font-size: 1.8vw;

	@media(max-width: ${screenSizes.mediumTablet}) {
		font-size: 2.8vw;
	};

	@media(max-width: ${screenSizes.smartPhones}) {
		font-size: 3.9vw;
	}
`;

const liveSearchPublication = css`
	display: flex;
	flex-direction: row;
	gap: 0.5vw;

	@media (max-width: ${screenSizes.largeTablet}) {gap: 1vw};
	@media (max-width: 538px) {
		gap: 2vw;
	};
`;

const liveSearchPubTitle = css`
	@media (max-width: 1270px) {font-size: 1.2vw};
	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.5vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.3vw};
	@media (max-width: 538px) {font-size: 2.7vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 3.2vw};
	@media (max-width: 350px) {font-size: 3.6vw};
`;

const liveSearchPubIcon = css`
	font-size: 1.3vw;

	@media (max-width: 1270px) {font-size: 1.5vw};
	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.8vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.5vw};
	@media (max-width: 538px) {font-size: 3.6vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 4.2vw};
	@media (max-width: 350px) {font-size: 5.2vw};
`;

const homeCnttPubAfterLogo = css`
	font-size: 0.8vw;

	@media (max-width: ${screenSizes.largeTablet}) {font-size: 1.4vw};
	@media (max-width: ${screenSizes.mediumTablet}) {font-size: 2.1vw};
	@media (max-width: ${screenSizes.smartPhones}) {font-size: 2.9vw};
`;
// #endregion

// #region functions
const defineCSS = (styleOption) => {
	switch (styleOption) {
		case "Homepage->Article":
			return ({
				container: homeContentPublication,
				title: homeContentPubTitle,
			});
			break;
		case "Homepage->Subcategory":
			return ({
				container: homeContentPublication,
				title: homeContentPubTitle,
			});
			break;
		case "Sidebar->Article":
			return ({
				container: cssSidePublication,
				title: cssSidePubTitle,
			});
			break;
		case "Livesearch->Article":
			return ({
				container: liveSearchPublication,
				title: liveSearchPubTitle,
			});
			break;
	}
}
// #endregion

// #region component
const propTypes = {
	type: PropTypes.string,
	cssLookup: PropTypes.object,
};

const defaultProps = {
	type: "article",
	cssLookup: {},
};

/**
 * 
 */
const PreLogotype = ({oPublication, cssOption}) => {
	return <div></div>;
}

/**
 * <title> prop - is exactly the publication title
 * <cssLookup> - is object contains classnames for css rules being applied
 * <children> - assumes pictogram
 */
const Publication = ({id, cssOption, type}) => {
	const publcItem = useRecoilValue(publicationSelector({type, id}));
	const cssLookup = defineCSS(cssOption);	

	return (
		<div className={cssLookup.container}>

			{/****** before-Pictograms rendering */}
			<PreLogotype oPublication = {publcItem} cssOption = {cssOption} />
			{
				type === 'article' && cssOption === "Homepage->Article" ? 
					publcItem.isVideo ? <FaFilm className={homeContentPubLogo} />
					: <FaRegFileAlt className={homeContentPubLogo} />
				: null
			}
			{
				type === 'subcategory' ?
					<FaFolder className={homeContentSubLogo} />
				: null
			}
			{
				type === 'article' && cssOption === "Sidebar->Article" ? 
					publcItem.isVideo ? <FaFilm className={cssSidePubLogo} />
					: <FaRegFileAlt className={cssSidePubLogo} />
				: null
			}
			{
				type === 'article' && cssOption === "Livesearch->Article" ? 
					publcItem.isVideo ? <FaFilm className={liveSearchPubIcon} />
					: <FaRegFileAlt className={liveSearchPubIcon} />
				: null
			}

			{
				publcItem.type === "reference_link" ? 
				<a href={publcItem.url} target="_blank" className={cssLookup.title}>
					{publcItem.title}
				</a>
				: null
			}

			{/***** after-Pictograms rendering */}
			{
				type === 'article' && (cssOption === "Homepage->Article" || cssOption === "Livesearch->Article") ? 
					publcItem.isPopular ? <FaRegStar className={homeCnttPubAfterLogo} />
					: null
				: null
			}
			{
				type === 'article' && (cssOption === "Homepage->Article" || cssOption === "Livesearch->Article") ? 
					publcItem.isLatest ? <FaBell className={homeCnttPubAfterLogo} />
					: null
				: null
			}
		</div>
	);
}

Publication.propTypes = propTypes;
Publication.defaultProps = defaultProps;
// #endregion

export default Publication;