import React from 'react';
import { Message } from 'semantic-ui-react';

const Intro = () => (
	<Message info compact>
		<p>Select a topic and indicator to view data for legislative districts throughout Connecticut.</p>

		<p>Clicking a district on the map brings up detailed information on that district and its legislator.</p>

		<p>Community Wellbeing Survey data is available only for Senate districts; Census data is available for both Senate and House districts.</p>

		<p>For more information on Connecticut's communities and cities, visit DataHaven's <a href="http://www.ctdatahaven.org/communities">Communities</a> page or <a href="http://www.ctdatahaven.org">main website</a>.</p>
	</Message>
);

export default Intro;
