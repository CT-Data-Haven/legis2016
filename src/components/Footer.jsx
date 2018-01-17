import React from 'react';
import '../styles/Footer.css';

const Footer = (props) => {
	let id = props.id.substr(-3);
	let url = `https://github.com/CT-Data-Haven/legislative_handouts/blob/public/handout/output/2016_profile_${props.chamber}_${id}.pdf`;
	return (
		<div className="Footer">
			<p><a href={url} target="_blank">Download printable profile on this district (pdf)</a> or <a href="https://github.com/ct-data-haven/legis2016/blob/master/public/data/2016_legislative_profiles.csv" target="_blank">data on all districts</a></p>
			<p>Source: DataHaven analysis (2017). US Census Bureau. American Community Survey 2016 5-year estimates; and <a href="http://ctdatahaven.org/reports/datahaven-community-wellbeing-survey" target="_blank">2015 DataHaven Community Wellbeing Survey</a>.</p>
			<p>Note: Names of senators and representatives current as of January 2, 2018.</p>
			<p> </p>
		</div>
	);
};

export default Footer;
