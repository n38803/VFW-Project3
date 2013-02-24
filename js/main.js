//Shaun Thompson
//VFW 1302 - Project 3
//02/17/2013


// Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){

	//Toggle Controls
	function toggleControls(n){
		switch(n){
			case "on":
				$('form').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('form').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";	
				$('items').style.display = "none";			
				break;
			default:
				return false;
		};
	};

	//Save data into local storage
	function storeData(){
		var id				= Math.floor(Math.random()*1000000001);
		//Gather up all our form field values and store them in an object
		//Object properties contain array with form label and input values
		getSelectedRadio();
		var item			= {};
			item.date		= ["Date: ", $('date').value];
			item.type		= ["Meal Type: ", $('type').value];
			item.group		= ["Food Group: ", groupValue];
			item.name		= ["Food Name: ", $('name').value];
			item.calories	= ["Calories: ", $('calories').value];
			item.notes		= ["Additional Notes: ", $('notes').value];
		//Save data to local storage
			localStorage.setItem(id, JSON.stringify(item));
			alert("Meal Saved!");
			
	};
	
	//find value of selected radio button
	function getSelectedRadio(){
		var radio = document.forms[0].group;
		for(var i=0; i<radio.length; i++){
			if(radio[i].checked){
				groupValue = radio[i].value;
			};
		};
	};
		
	//clear all data
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear!");
		}else{
			localStorage.clear();
			alert("All meals have been erased.");
			window.location.reload();
			return false;
		};
	};
		
	//getElementByID Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	};
	
	//Create select field element and populate with options.
	function makeType(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "type");
			
		for(var i=0, j=mealType.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = mealType[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		};
		selectLi.appendChild(makeSelect);
	};

	//Variable Defaults
	var mealType = ["---Choose A Meal Type---", "Breakfast", "Lunch", "Dinner", "Other"],
		groupValue;

	//Write data from local storage to browser
	function getData(){
		if(localStorage.length === 0){
			alert("There are no meals currently tracked.");
		};
		toggleControls("on");
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			
			var linksLi = document.createElement('li');
			
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			
			//Convert the string from local storage
			var obj = JSON.parse(value);
			var makeSublist = document.createElement('ul');
			makeli.appendChild(makeSublist);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSublist.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				
				makeSublist.appendChild(linksLi);
			};
			//makeItemLinks(); //Create our edit & delete buttons for local storage
		};
	};
		
	makeType();

	//Set link & Submit Click Events
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	

	var save = $('submit');
	save.addEventListener("click", storeData);


});