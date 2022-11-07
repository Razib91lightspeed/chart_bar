// DISCLAIMER: this code should not be treated as any "model example"
// of good code. It is unpolished and may contain bugs and be written
// in a fashion that should be avoided when creating "real" applications.
// This example has been created merely to demonstrate some points 
// discussed during the remote session. Therefore, the code may
// contain unorthodox patterns and ways to implement functionalities.

const dataValues = [2, 6, 4, 3, 1, 5, 7, 8, 9]
const dataLabels = ['Finland', 'Netherlands', 'Greenland', 'Poland', 'England','Iceland', 'Switzerland', 'Ireland', 'New Zealand']
// colors corresponding to integer values from 0 to 10:
const rgbVals = [[255, 0, 0], [255, 69, 71], [255, 69, 0], [255, 165, 0], [255, 215, 0], [255, 255, 0], 
				[154, 205, 50], [173, 255, 47], [0, 255, 127], [50, 205, 50], [34, 139, 34]];
const colors = rgbVals.map(([r, g, b]) => `rgba(${r}, ${g}, ${b}, 0.4)`);
const opaqueColors = rgbVals.map(([r, g, b]) => `rgba(${r}, ${g}, ${b}, 1)`);


function onInputValue(index, element) {
	dataValues[index] = +element.value;
	console.log(dataValues);
	const color = opaqueColors[+element.value];
	element.style.backgroundColor = color;
	updChart();
}


function randomize() {
	const l = dataValues.length;
	for(let i = 0; i < l; i++) {
		dataValues[i] = Math.round(Math.random() * 10);
		const element = document.getElementById("input" + i);
		element.value = dataValues[i];
		const color = opaqueColors[dataValues[i]];
		element.style.backgroundColor = color;
	}
	console.log(dataValues);
	updChart();
}

let fooChart = null;


function getCurrentColors() {
	return [dataValues.map((val) => colors[val]), dataValues.map((val) => opaqueColors[val])]
}


const updChart = () => {
	const ctx = document.getElementById('chart').getContext('2d');
	let dataColors;
	let borderColors;
	[dataColors, borderColors] = getCurrentColors();
	if(fooChart) {
		fooChart.destroy();
	}
	fooChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: dataLabels,
			datasets: [{
				label: 'Interesting measure',
				data: dataValues,
				backgroundColor: dataColors,
				borderColor: borderColors,
				borderWidth: 3
			}]
		},
		options: {
			legend: {
				display: false
			},
			tooltips: {
				enabled: false
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			},
			animation: false,
			events: []
		}
	});
}


window.onload = () => {

	// Adding number inputs corresponding to the dataValues array:
	const cont = document.getElementById('input-container');
	const l = dataValues.length;
	for(let i = 0; i < l; i++){
		const input = document.createElement("input");
		input.type = "number";
		input.id = "input" + i;
		input.addEventListener('input', (event) => {onInputValue(i, event.target);});
		input.min = "0";
		input.max = "10";
		input.value = `${dataValues[i]}`
		input.style.backgroundColor = opaqueColors[+input.value];
		cont.appendChild(input);
	}
	
	const ctx = document.getElementById('c').getContext('2d');
	let gradient = ctx.createLinearGradient(0, 0, 500, 100);
	gradient.addColorStop(0, "blue");
	gradient.addColorStop(0.5, "green");
	gradient.addColorStop(1, "orange");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 500, 100);

	ctx.lineWidth = 3;
	ctx.strokeStyle = 'maroon';
	ctx.beginPath();
	ctx.arc(250, 20, 10, 0, 2 * Math.PI);
	ctx.fillStyle = 'maroon';
	ctx.fill();
	ctx.moveTo(250, 30);
	ctx.lineTo(250, 55);
	ctx.lineTo(260, 85);
	ctx.moveTo(250, 55);
	ctx.lineTo(240, 85);
	ctx.moveTo(220, 40);
	ctx.lineTo(280, 40);
	ctx.stroke(); // strokes the path with the current stroke style
	
  	updChart();
}

