const cheerio = require('cheerio');
const request = require('request');


request({
    method: 'GET',
    url: 'http://results.eci.gov.in/pc/en/constituencywise/ConstituencywiseS281.htm?ac=1'
}, function(err, response, body) {
    if (err) {
    	return console.error(err);
    }
    $ = cheerio.load(body);
	var table_rows = $('.table-party tr');

	for (var i = 0; i < table_rows.length; i++) {

		table_row = table_rows[i];
		switch(i) {
			case 0: 
				table_header_raw = $(table_row).children('th')[0];
				table_header = $(table_header_raw).text().trim();
				parsed_string = table_header.split('-');
				
				indian_state = parsed_string[0];
				indian_district = parsed_string[1];

				// console.log(indian_state);
				// console.log(indian_district);
				break;
			case 1: 
				break;
			case 2: 
				break;
			default:
				table_cells = $(table_row).children('td');

				for(var j = 0; j < table_cells.length; j++) {
					table_cell = table_cells[j];
					// console.log($(table_cell).text());
				}
		}
	}
});
