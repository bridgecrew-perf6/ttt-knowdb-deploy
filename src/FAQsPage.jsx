import React, {useState, useEffect} from 'react';
import MainContainer from './components/MainContainer';
import ComingSoon from './components/ComingSoon';
import PageTitle from './components/PageTitle';
import FullSpinner from './components/FullSpinner';

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component

/**
 * 
 */
const Body = () => {
	return (
		<>
			<PageTitle text="Frequently Asked Questions" />
			<ComingSoon />
		</>
	)
}

const FAQsPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(async () => {
		await new Promise(resolve => setTimeout(resolve,1000));
		setLoading(false);
	});

	return <MainContainer>
		{loading ? <FullSpinner text="Retrieving FAQs page..." /> : <Body />}
	</MainContainer>;
}

// #endregion

export default FAQsPage;