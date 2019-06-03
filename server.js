const cheerio = require('cheerio');
const request = require('request');
const places = require('./state_ut_data');

async function helper() {
	for(var it = 0; it < places.length; it++) {
		const place = places[it];

		const start_index = place['start_index'];

		for(var jt = 1; jt <= place['constituencies']; jt++) {
			param_num = start_index + jt - 1;
			var param;

			if(place['type'] == 'ut') {
				param = 'U' + param_num;
				if(param_num < 100) {
					param = 'U0' + param_num;
				}
			} else {
				param = 'S' + param_num;
				if(param_num < 100) {
					param = 'S0' + param_num;
				}
			}

			let url = 'http://results.eci.gov.in/pc/en/constituencywise/Constituencywise' + param + '.htm?ac=' + jt;
			await call_result_election(url);
		}
	}
}

async function call_result_election(url) {

	await request({
	    method: 'GET',
	    url: url
	}, async function(err, response, body) {
		if (err) {
	    	console.log('Terminating');
	    	return console.error(err);
	    }
	    console.log(url);
		await scrape(body);
	});
}

async function scrape(body) {
    
    $ = cheerio.load(body);
	var table_rows = $('.table-party tr');

	for (var i = 0; i < table_rows.length - 1; i++) {

		table_row = table_rows[i];
		switch(i) {
			case 0: 
				table_header_raw = $(table_row).children('th')[0];
				table_header = $(table_header_raw).text().trim();
				parsed_string = table_header.split('-');
				
				indian_state = parsed_string[0];
				indian_district = parsed_string[1];

				console.log(indian_state + " " + indian_district);
				break;
			case 1: 
				break;
			case 2: 
				break;
			default:
				table_cells = $(table_row).children('td');

				var candidate, party, evm_votes, postal_votes, total_votes, perc_of_votes;
				for(var j = 0; j < table_cells.length; j++) {

					table_cell = table_cells[j];
					switch(j) {
						case 0:
							// serial number. do nothing
							break;
						case 1: 
							candidate = $(table_cell).text().trim();
							break;
						case 2: 
							party = $(table_cell).text().trim();
							break;
						case 3: 
							evm_votes = $(table_cell).text().trim();
							break;
						case 4: 
							postal_votes = $(postal_votes).text().trim();
							break;
						case 5: 
							total_votes = $(table_cell).text().trim();
							break;
						case 6: 
							perc_of_votes = $(table_cell).text().trim();
							break;
					}
				}
				console.log(candidate + " " + " " + party + " " + evm_votes + " " + total_votes + " " + perc_of_votes);
				break;
		}
	}
	console.log("\n\n\n\n");
}


helper();
