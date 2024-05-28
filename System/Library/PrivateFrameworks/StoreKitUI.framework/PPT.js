var gIsPad = (Device.model == "iPad");

/* Bootstrap JS file used for StoreKitUI PPT tests */
App.onLaunch = function(options) {
	var doc = DOMImplementationRegistry.getDOMImplementation().createDocument(null, 'document');

	// Add common stylesheet to the document
	var head = doc.createElement('head');
	var style = doc.createElement('style');
	style.textContent = gStylesheet;
	head.appendChild(style);
	doc.documentElement.appendChild(head);

	// Add template to the document
	var templateDefinition = options.template;
	if (templateDefinition) {
		var templateType = templateDefinition.type;
		if (templateType == 'stackTemplate') {
			var templateElement = CreateStackTemplate(doc, templateDefinition);
			doc.documentElement.appendChild(templateElement);
		}
	}

	// Present per the test options
	var modalType = options.modal;
	if (modalType) {
		modal.pushDocument(doc, {'animated': false, 'type': modalType});
	}
	else {
		TabBar.selectedTab.navigationDocument.pushDocument(doc, {'animated': false});
	}

	// Kick off the actual test
	doc.runTest(options.testName, options);
}

// Creates a divider element from a component dictionary
function CreateAccountButtonsElementWithComponent(doc, componentDefinition) {
	return doc.createElement('accountButtons');
}

// Create a brick lockup element
function CreateBrickLockup(doc) {
	var lockup = doc.createElement('lockup');
	lockup.setAttribute('type', 'shelf');

	var image = CreateImageElement(doc, 'brick', 208, 102);
	lockup.appendChild(image);

	return lockup;
}

// Creates a carousel element from a component dictionary
function CreateCarouselElementWithComponent(doc, componentDefinition) {
	var carousel = doc.createElement('carousel');

	var width = (gIsPad ? 398 : 320);
	var height = (gIsPad ? 195 : 130);

	var count = componentDefinition['count'];
	for (var i = 0; i < count; i++) {
		var image = CreateImageElement(doc, 'carousel', width, height);
		carousel.appendChild(image);
	}

	return carousel;
}

// Creates a carousel element from a component dictionary
function CreateDescriptionElementWithComponent(doc, componentDefinition) {
	var description = doc.createElement('description');
	description.setAttribute('moreLabel', 'more');

	var maxLines = componentDefinition.maxLines;
	if (maxLines) {
		description.setAttribute('maxLines', maxLines.toString());
	}
	else if (gIsPad) {
		description.setAttribute('maxLines', '5');
	}
	else {
		description.setAttribute('maxLines', '3');
	}

	description.textContent = CreateRandomLabelText(250);

	return description;
}

// Creates a divider element from a component dictionary
function CreateDividerElementWithComponent(doc, componentDefinition) {
	return doc.createElement('divider');
}

// Creates an element (and its children) based on a component dictionary
function CreateElementWithComponent(doc, componentDefinition) {
	var element = null;
	var componentType = componentDefinition.type;
	if (componentType == 'accountButtons') {
		element = CreateAccountButtonsElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'carousel') {
		element = CreateCarouselElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'description') {
		element = CreateDescriptionElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'divider') {
		element = CreateDividerElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'grid') {
		element = CreateGridElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'header') {
		element = CreateHeaderElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'lockup') {
		element = CreateLockupElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'mediaQuery') {
		element = CreateMediaQueryElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'segmentedControl') {
		element = CreateSegmentedControlWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'shelf') {
		element = CreateShelfElementWithComponent(doc, componentDefinition);
	}
	else if (componentType == 'trackList') {
		element = CreateTrackListElementWithComponent(doc, componentDefinition);
	}
	return element;
}

// Create a grid button
function CreateGridButton(doc) {
	var button = doc.createElement('button');
	button.textContent = CreateRandomLabelText(5);
	return button;
}

// Creates a grid element from a component dictionary
function CreateGridElementWithComponent(doc, componentDefinition) {
	var grid = doc.createElement('grid');

	var childType = componentDefinition.subtype;
	if (childType == 'button') {
		grid.setAttribute('class', 'buttonGrid');
	}

	var count = componentDefinition.count;
	for (var i = 0; i < count; i++) {
		if (childType == 'button') {
			var button = CreateGridButton(doc);
			grid.appendChild(button);
		}
		else if (childType == 'gridLockup') {
			var lockup = CreateGridLockup(doc);
			grid.appendChild(lockup);
		}
	}

	return grid;
}

// Create a grid lockup element
function CreateGridLockup(doc) {
	var lockup = doc.createElement('lockup');
	lockup.setAttribute('type', 'grid');

	if (gIsPad) {
		var image = CreateImageElement(doc, 'album', 75, 75);
		lockup.appendChild(image);
	}
	else {
		var image = CreateImageElement(doc, 'album', 64, 64);
		lockup.appendChild(image);
	}

	var title = doc.createElement('title');
	title.setAttribute('class', 'title');
	title.textContent = CreateRandomLabelText(10);
	lockup.appendChild(title);

	var subtitle = doc.createElement('subtitle');
	subtitle.textContent = CreateRandomLabelText(10);
	lockup.appendChild(subtitle);

	var starRating = doc.createElement('starRating');
	starRating.setAttribute('value', (Math.random() * 5).toString());
	starRating.textContent = Math.floor(Math.random() * 900 + 1).toString();
	lockup.appendChild(starRating);

	var priceCount = gPrices.length;
	var buyButton = doc.createElement('button');
	buyButton.setAttribute('type', 'buy');
	buyButton.textContent = gPrices[Math.floor(Math.random() * priceCount)];
	lockup.appendChild(buyButton);

	return lockup;
}

// Creates a header element from a component dictionary
function CreateHeaderElementWithComponent(doc, componentDefinition) {
	var header = doc.createElement('header');

	var titleString = componentDefinition.title;
	if (!titleString) {
		titleString = CreateRandomLabelText(10);
	}
	var title = doc.createElement('title');
	title.textContent = titleString;
	header.appendChild(title);

	var seeAllButton = doc.createElement('button');
	seeAllButton.setAttribute('type', 'link');
	seeAllButton.textContent = 'See All';
	header.appendChild(seeAllButton);

	return header;
}

function CreateImageElement(doc, type, width, height) {
	var imageElement = null;

	var styleClassName = null;
	var URLArray = null;
	if (type == 'album') {
		if (width == 44) {
			URLArray = gURLsAlbum88;
		}
		else if (width == 64) {
			URLArray = gURLsAlbum128;
		}
		else if (width == 75) {
			URLArray = gURLsAlbum150;
		}
		else if (width == 80) {
			URLArray = gURLsAlbum160;
		}
		else if (width == 100) {
			URLArray = gURLsAlbum200;
		}
		else if (width == 163) {
			URLArray = gURLsAlbum326;
		}
		else {
			URLArray = gURLsAlbum340;
		}
		styleClassName = 'productImage';
	}
	else if (type == 'brick') {
		URLArray = gURLsBrick416;
	}
	else if (type == 'carousel') {
		styleClassName = 'productImage';
		URLArray = gURLsCarousel1060;
	}
	if (URLArray) {
		imageElement = doc.createElement('img');
		imageElement.setAttribute('height', height.toString());
		imageElement.setAttribute('width', width.toString());

		if (styleClassName) {
			imageElement.setAttribute('class', styleClassName);
		}

		var URLCount = URLArray.length;
		imageElement.setAttribute('src', URLArray[Math.floor(Math.random() * URLCount)]);
	}

	return imageElement;
}

// Create a list lockup element
function CreateListLockup(doc) {
	var lockup = doc.createElement('lockup');
	lockup.setAttribute('type', 'list');

	var image = CreateImageElement(doc, 'album', 44, 44);
	lockup.appendChild(image);

	var title = doc.createElement('title');
	title.setAttribute('class', 'title');
	title.textContent = CreateRandomLabelText(10);
	lockup.appendChild(title);

	var subtitle = doc.createElement('subtitle');
	subtitle.textContent = CreateRandomLabelText(10);
	lockup.appendChild(subtitle);

	var priceCount = gPrices.length;
	var buyButton = doc.createElement('button');
	buyButton.setAttribute('type', 'buy');
	buyButton.textContent = gPrices[Math.floor(Math.random() * priceCount)];
	lockup.appendChild(buyButton);

	return lockup;
}

// Creates a lockup element from a component dictionary
function CreateLockupElementWithComponent(doc, componentDefinition) {
	var lockup = null;

	var lockupType = componentDefinition.subtype;
	if (lockupType == 'grid') {
		lockup = CreateGridLockup(doc);
	}
	else if (lockupType == 'list') {
		lockup = CreateListLockup(doc);
	}
	else if (lockupType == 'product') {
		lockup = CreateProductLockup(doc);
	}
	else if (lockupType == 'shelf') {
		lockup = CreateShelfLockup(doc);
	}

	return lockup;
}

// Creates a mediaQuery element from a component dictionary
function CreateMediaQueryElementWithComponent(doc, componentDefinition) {
	var query = doc.createElement('mediaQuery');
	query.setAttribute('cellFactory', 'AlbumCellFactory');
	query.setAttribute('preset', 'albums');

	var property = doc.createElement('property');
	property.setAttribute('name', 'albumAlbumArtist');
	property.setAttribute('type', 'collection');
	query.appendChild(property);

	property = doc.createElement('property');
	property.setAttribute('name', 'albumName');
	property.setAttribute('type', 'collection');
	query.appendChild(property);

	property = doc.createElement('property');
	property.setAttribute('name', 'itemCount');
	property.setAttribute('type', 'collection');
	query.appendChild(property);

	property = doc.createElement('property');
	property.setAttribute('name', 'playbackDuration');
	property.setAttribute('type', 'item');
	property.setAttribute('aggregate', 'TOTAL');
	query.appendChild(property);

	return query;
}

// Create a product lockup element
function CreateProductLockup(doc) {
	var lockup = doc.createElement('lockup');
	lockup.setAttribute('type', 'product');

	if (gIsPad) {
		var image = CreateImageElement(doc, 'album', 170, 170);
		lockup.appendChild(image);
	}
	else {
		var image = CreateImageElement(doc, 'album', 100, 100);
		lockup.appendChild(image);
	}

	var title = doc.createElement('title');
	title.setAttribute('class', 'title');
	title.textContent = CreateRandomLabelText(10);
	lockup.appendChild(title);

	var subtitle = doc.createElement('subtitle');
	subtitle.textContent = CreateRandomLabelText(10);
	lockup.appendChild(subtitle);

	var genre = doc.createElement('text');
	genre.textContent = CreateRandomLabelText(1);
	lockup.appendChild(genre);

	var itemCount = doc.createElement('text');
	itemCount.textContent = '22 songs';
	lockup.appendChild(itemCount);

	var starRating = doc.createElement('starRating');
	starRating.setAttribute('value', (Math.random() * 5).toString());
	starRating.textContent = Math.floor(Math.random() * 900 + 1).toString();
	lockup.appendChild(starRating);

	var priceCount = gPrices.length;
	var buyButton = doc.createElement('button');
	buyButton.setAttribute('type', 'buy');
	buyButton.textContent = gPrices[Math.floor(Math.random() * priceCount)];
	lockup.appendChild(buyButton);

	return lockup;
}

function CreateRandomLabelText(maxWordCount) {
	var text = '';

	var dictionaryCount = gWords.length;
	var length = Math.floor(Math.random() * maxWordCount + 1);
	for (var i = 0; i < length; i++) {
		if (i > 0) {
			text += ' ';
		}
		var wordIndex = Math.floor(Math.random() * dictionaryCount);
		text += gWords[wordIndex];
	}

	return text;
}

// Creates a segmented control element from a component dictionary
function CreateSegmentedControlWithComponent(doc, componentDefinition) {
	var segmentedControl = doc.createElement('segmentedControl');
	segmentedControl.setAttribute('pin', '1');

	for (var i = 0; i < 3; i++) {
		var item = doc.createElement('item');
		if (i == 0) {
			item.setAttribute('selected', '1');
		}
		item.textContent = CreateRandomLabelText(2);
		segmentedControl.appendChild(item);
	}

	return segmentedControl;
}

// Creates a shelf element from a component dictionary
function CreateShelfElementWithComponent(doc, componentDefinition) {
	var shelf = doc.createElement('shelf');

	var childType = componentDefinition.subtype;
	if (childType == 'brick') {
		shelf.setAttribute('class', 'brick');
	}
	else if (childType == 'listLockup') {
		shelf.setAttribute('class', 'trackShelf');
		shelf.setAttribute('rowCount', '4');
	}

	var count = componentDefinition.count;
	for (var i = 0; i < count; i++) {
		if (childType == 'brick') {
			var lockup = CreateBrickLockup(doc);
			shelf.appendChild(lockup);
		}
		else if (childType == 'listLockup') {
			var lockup = CreateListLockup(doc);
			shelf.appendChild(lockup);
		}
		else if (childType == 'shelfLockup') {
			var lockup = CreateShelfLockup(doc);
			shelf.appendChild(lockup);
		}
	}

	return shelf;
}

// Create a grid lockup element
function CreateShelfLockup(doc) {
	var lockup = doc.createElement('lockup');
	lockup.setAttribute('type', 'shelf');

	if (gIsPad) {
		var image = CreateImageElement(doc, 'album', 163, 163);
		lockup.appendChild(image);
	}
	else {
		var image = CreateImageElement(doc, 'album', 80, 80);
		lockup.appendChild(image);
	}

	var title = doc.createElement('title');
	title.setAttribute('class', 'title');
	title.textContent = CreateRandomLabelText(10);
	lockup.appendChild(title);

	var subtitle = doc.createElement('subtitle');
	subtitle.textContent = CreateRandomLabelText(10);
	lockup.appendChild(subtitle);

	return lockup;
}

// Creates a stack template from a component array
function CreateStackTemplate(doc, templateDefinition) {
	var templateElement = doc.createElement('stackTemplate');

	var components = templateDefinition.children;
	if (components) {
		var length = components.length;
		for (var i = 0; i < length; i++) {
			var element = CreateElementWithComponent(doc, components[i]);
			if (element) {
				templateElement.appendChild(element);
			}
		}
	}

	return templateElement;
}

// Creates a track element
function CreateTrackElement(doc, index) {
	var track = doc.createElement('track');

	var ordinal = doc.createElement('ordinal');
	ordinal.textContent = (index + 1).toString();
	track.appendChild(ordinal);

	var title = doc.createElement('title');
	title.setAttribute('class', 'title');
	title.textContent = CreateRandomLabelText(10);
	track.appendChild(title);

	var subtitle = doc.createElement('subtitle');
	subtitle.textContent = CreateRandomLabelText(10);
	track.appendChild(subtitle);

	var durationText = doc.createElement('text');
	var duration = doc.createElement('duration');
	duration.textContent = (60 + Math.floor(Math.random() * 60 * 10)).toString();
	durationText.appendChild(duration);
	track.appendChild(durationText);

	if (gIsPad) {
		var popularity = doc.createElement('popularity');
		popularity.setAttribute('value', Math.random().toString());
		track.appendChild(popularity);
	}

	var priceCount = gPrices.length;
	var buyButton = doc.createElement('button');
	buyButton.setAttribute('type', 'buy');
	buyButton.textContent = gPrices[Math.floor(Math.random() * priceCount)];
	track.appendChild(buyButton);

	return track;
}

// Creates a trackList element from a component dictionary
function CreateTrackListElementWithComponent(doc, componentDefinition) {
	var trackList = doc.createElement('trackList');

	var count = componentDefinition.count;
	for (var i = 0; i < count; i++) {
		var track = CreateTrackElement(doc, i);
		trackList.appendChild(track);
	}

	return trackList;
}

// Stylesheet used for all templates
var gStylesheet = "\
.brick {\
	itml-img-treatment: brick;\
}\
.buttonGrid {\
	column-count: 3;\
}\
.productImage {\
	itml-img-treatment: product;\
}\
.title {\
	itml-text-max-lines: 2;\
}\
";

// Prices for buy buttons
var gPrices = [
"FREE",
"$0.99",
"$1.99",
"$2.99",
"$3.99",
"$4.99",
"$5.99",
];

// Words used to generate label text
var gWords = [
"A",
"+1",
"Out",
"Loko",
"Fanny",
"Before",
"Salvia", 
"Seitan",
"Artisan",
"Mixtape",
"Vinegar",
"Tattooed",
"Fingerstache",
"Flexitarian",
];

// Album image URLs, 88x88px
// Used for track shelves
var gURLsAlbum88 = [
"http://a4.mzstatic.com/us/r30/Music2/v4/15/57/2a/15572ad7-d59d-9a5a-94c3-5df973308289/cover88x88.jpeg",
"http://a5.mzstatic.com/us/r30/Music2/v4/65/30/74/653074d1-88ba-dbf2-4bc9-f1145510dfd5/cover88x88.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/9c/a1/99/9ca1991a-59a0-83b6-dc11-a893ed54a12b/cover88x88.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/4c/8f/2e/4c8f2ed9-6dfc-ded9-4b64-0ebc34d068cb/cover88x88.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/94/05/bb/9405bb57-be3a-7048-f80f-faefe3ae40a3/cover88x88.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/aa/57/0f/aa570fe2-e826-8d11-e12d-ffd4e729afc8/cover88x88.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/8d/8f/a4/8d8fa4ac-6ad8-25b2-b46f-b8f80752c07d/cover88x88.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/04/3c/76/043c760d-b0f5-ee54-138e-0a168c8d6545/cover88x88.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/19/5f/74/195f7431-fde7-529d-6eff-045162fb3e7a/cover88x88.jpeg",
"http://a4.mzstatic.com/us/r30/Music/v4/20/cf/ed/20cfede1-1be8-1b2a-795c-a7083e4e11b6/cover88x88.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/ce/a0/0c/cea00c0e-55af-2ae1-4e97-6b10f6ce6ed4/cover88x88.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/09/f4/fb/09f4fba2-913b-b8c5-eed0-7f8b424427c6/cover88x88.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/db/c4/a4/dbc4a45f-3024-2c96-72ed-42310ece8140/cover88x88.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/f6/55/2a/f6552a00-4426-f669-9dcc-9e096ec0de8a/cover88x88.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/dc/36/a7/dc36a705-bccc-0fa9-e3ac-3c7f0ab29cec/cover88x88.jpeg",
"http://a2.mzstatic.com/us/r30/Music4/v4/59/5e/e7/595ee773-06f5-15cf-66a7-52083a73afeb/cover88x88.jpeg",
"http://a2.mzstatic.com/us/r30/Music/v4/f1/4f/25/f14f25c0-f2b3-8721-055b-2984ffaad60f/cover88x88.jpeg",
"http://a2.mzstatic.com/us/r30/Music4/v4/ea/d0/d4/ead0d490-ac8c-7968-c53a-8f0cee229ddb/cover88x88.jpeg"
];

// Album image URLs, 128x128px
// Used for rooms on iPhone
var gURLsAlbum128 = [
"http://a2.mzstatic.com/us/r30/Music4/v4/8b/3c/19/8b3c1901-1264-fb71-9489-56ca6d3a7836/cover128x128.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/21/45/c6/2145c6ad-f2fd-d714-c83f-57a01dd54a31/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/a4/0b/3b/a40b3b10-56d1-a291-023d-4038b599b7f6/cover128x128.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/61/2a/4b/612a4b37-e625-5085-db7b-6e8100444e41/cover128x128.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/e0/9e/fa/e09efac1-3df7-a4c5-3b07-fa2f1ce266e6/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/95/6f/cd/956fcd7d-8192-bde5-0a9b-5ac5d10886e8/cover128x128.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/cb/c3/d8/cbc3d817-8a7a-5205-f3e4-e0c3adffd77b/cover128x128.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/eb/a3/dc/eba3dc15-48bf-e1fe-695b-5f8aedba30ef/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/bf/cc/eb/bfccebdf-80bd-bc64-83ae-c6e8345d119b/cover128x128.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/82/9e/69/829e69f6-6a31-d90a-1dbd-70843e8656e3/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/88/56/8a/88568a0c-45bb-abd9-cc49-599234aa7764/cover128x128.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/5b/65/f0/5b65f064-3cff-e55e-ee22-294253afcecf/cover128x128.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/b0/c9/df/b0c9dfe5-ba45-2414-eb47-8808d00331b4/cover128x128.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/3b/25/58/3b255888-20d4-5b12-1054-28ef8c5c0da8/cover128x128.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/fb/1d/e6/fb1de684-1b5d-3b2a-30ee-ddaf1fce1c97/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/67/d9/bc/67d9bcdd-d68d-fa56-ecda-050e821280bb/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/87/b9/5c/87b95c0b-f736-537f-a333-24242e4c8b7d/cover128x128.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/30/57/40/30574076-7279-d2d8-fc89-f8c768470283/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/16/a6/68/16a668c0-4628-6cfc-ebf9-36d87c064ac6/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/4b/a9/9e/4ba99e6f-af86-989c-c415-d193697f9dff/cover128x128.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/a3/37/32/a3373268-74de-cdca-00de-a99276c71b21/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/7c/37/86/7c3786b2-2788-7fca-35e0-f55c1a71e7e8/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/09/7c/d8/097cd808-5cae-5851-a03d-be44aa3a66f0/cover128x128.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/e9/e7/cb/e9e7cbc7-a44f-e226-382a-a4f542df8dc2/cover128x128.jpeg",
"http://a4.mzstatic.com/us/r30/Music6/v4/fd/8a/01/fd8a0149-7f3e-f858-44b2-2f59d08621f9/cover128x128.jpeg"
];

// Album image URLs, 150x150px
// Used for rooms on iPad
var gURLsAlbum150 = [
"http://a2.mzstatic.com/us/r30/Music4/v4/8b/3c/19/8b3c1901-1264-fb71-9489-56ca6d3a7836/cover150x150.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/21/45/c6/2145c6ad-f2fd-d714-c83f-57a01dd54a31/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/a4/0b/3b/a40b3b10-56d1-a291-023d-4038b599b7f6/cover150x150.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/61/2a/4b/612a4b37-e625-5085-db7b-6e8100444e41/cover150x150.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/e0/9e/fa/e09efac1-3df7-a4c5-3b07-fa2f1ce266e6/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/95/6f/cd/956fcd7d-8192-bde5-0a9b-5ac5d10886e8/cover150x150.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/cb/c3/d8/cbc3d817-8a7a-5205-f3e4-e0c3adffd77b/cover150x150.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/eb/a3/dc/eba3dc15-48bf-e1fe-695b-5f8aedba30ef/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/bf/cc/eb/bfccebdf-80bd-bc64-83ae-c6e8345d119b/cover150x150.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/82/9e/69/829e69f6-6a31-d90a-1dbd-70843e8656e3/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/88/56/8a/88568a0c-45bb-abd9-cc49-599234aa7764/cover150x150.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/5b/65/f0/5b65f064-3cff-e55e-ee22-294253afcecf/cover150x150.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/b0/c9/df/b0c9dfe5-ba45-2414-eb47-8808d00331b4/cover150x150.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/3b/25/58/3b255888-20d4-5b12-1054-28ef8c5c0da8/cover150x150.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/fb/1d/e6/fb1de684-1b5d-3b2a-30ee-ddaf1fce1c97/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/67/d9/bc/67d9bcdd-d68d-fa56-ecda-050e821280bb/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/87/b9/5c/87b95c0b-f736-537f-a333-24242e4c8b7d/cover150x150.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/30/57/40/30574076-7279-d2d8-fc89-f8c768470283/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/16/a6/68/16a668c0-4628-6cfc-ebf9-36d87c064ac6/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/4b/a9/9e/4ba99e6f-af86-989c-c415-d193697f9dff/cover150x150.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/a3/37/32/a3373268-74de-cdca-00de-a99276c71b21/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/7c/37/86/7c3786b2-2788-7fca-35e0-f55c1a71e7e8/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/09/7c/d8/097cd808-5cae-5851-a03d-be44aa3a66f0/cover150x150.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/e9/e7/cb/e9e7cbc7-a44f-e226-382a-a4f542df8dc2/cover150x150.jpeg",
"http://a4.mzstatic.com/us/r30/Music6/v4/fd/8a/01/fd8a0149-7f3e-f858-44b2-2f59d08621f9/cover150x150.jpeg"
];

// Album image URLs, 160x160px
// Used for shelves on iPhone
var gURLsAlbum160 = [
"http://a2.mzstatic.com/us/r30/Music4/v4/8b/3c/19/8b3c1901-1264-fb71-9489-56ca6d3a7836/cover160x160.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/21/45/c6/2145c6ad-f2fd-d714-c83f-57a01dd54a31/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/a4/0b/3b/a40b3b10-56d1-a291-023d-4038b599b7f6/cover160x160.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/61/2a/4b/612a4b37-e625-5085-db7b-6e8100444e41/cover160x160.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/e0/9e/fa/e09efac1-3df7-a4c5-3b07-fa2f1ce266e6/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/95/6f/cd/956fcd7d-8192-bde5-0a9b-5ac5d10886e8/cover160x160.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/cb/c3/d8/cbc3d817-8a7a-5205-f3e4-e0c3adffd77b/cover160x160.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/eb/a3/dc/eba3dc15-48bf-e1fe-695b-5f8aedba30ef/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/bf/cc/eb/bfccebdf-80bd-bc64-83ae-c6e8345d119b/cover160x160.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/82/9e/69/829e69f6-6a31-d90a-1dbd-70843e8656e3/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/88/56/8a/88568a0c-45bb-abd9-cc49-599234aa7764/cover160x160.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/5b/65/f0/5b65f064-3cff-e55e-ee22-294253afcecf/cover160x160.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/b0/c9/df/b0c9dfe5-ba45-2414-eb47-8808d00331b4/cover160x160.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/3b/25/58/3b255888-20d4-5b12-1054-28ef8c5c0da8/cover160x160.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/fb/1d/e6/fb1de684-1b5d-3b2a-30ee-ddaf1fce1c97/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/67/d9/bc/67d9bcdd-d68d-fa56-ecda-050e821280bb/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/87/b9/5c/87b95c0b-f736-537f-a333-24242e4c8b7d/cover160x160.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/30/57/40/30574076-7279-d2d8-fc89-f8c768470283/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/16/a6/68/16a668c0-4628-6cfc-ebf9-36d87c064ac6/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/4b/a9/9e/4ba99e6f-af86-989c-c415-d193697f9dff/cover160x160.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/a3/37/32/a3373268-74de-cdca-00de-a99276c71b21/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music6/v4/7c/37/86/7c3786b2-2788-7fca-35e0-f55c1a71e7e8/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/09/7c/d8/097cd808-5cae-5851-a03d-be44aa3a66f0/cover160x160.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/e9/e7/cb/e9e7cbc7-a44f-e226-382a-a4f542df8dc2/cover160x160.jpeg",
"http://a4.mzstatic.com/us/r30/Music6/v4/fd/8a/01/fd8a0149-7f3e-f858-44b2-2f59d08621f9/cover160x160.jpeg"
];

// Album image URLs, 200x200px
// Used for product pages on iPhone
var gURLsAlbum200 = [
"http://a1.mzstatic.com/us/r30/Music4/v4/b7/ec/d1/b7ecd1bf-1d39-aaf5-1ec2-0b583cf2e249/cover200x200.jpeg",
"http://a4.mzstatic.com/us/r30/Music6/v4/bc/03/18/bc031872-65bc-9503-fe33-cff45b2d5db1/cover200x200.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/7a/2e/a2/7a2ea294-67d9-ba94-ff4d-fedf28031a4d/cover200x200.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/ef/82/b2/ef82b24c-1f0e-953c-fc78-d0b0480d188e/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/7b/bf/52/7bbf52ed-f3d6-bbc2-4af2-3fc1d845729c/cover200x200.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/53/4b/d6/534bd648-bc26-1897-bd17-c8e5a3b3f174/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/3a/0e/ad/3a0ead6e-9895-1598-41eb-3dbec113db9b/cover200x200.jpeg",
"http://a4.mzstatic.com/us/r30/Music/v4/62/76/bc/6276bcbc-64bf-2e64-d234-50f2ba5bd444/cover200x200.jpeg",
"http://a4.mzstatic.com/us/r30/Music/v4/2c/45/ce/2c45cee0-bfce-faea-f9ff-6513825d2042/cover200x200.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/ea/50/5c/ea505c86-f6eb-c5fa-9c88-f8e82db3c419/cover200x200.jpeg",
"http://a2.mzstatic.com/us/r30/Music4/v4/cf/8a/7f/cf8a7ff6-3c4a-7e4c-8e77-de0b83b80991/cover200x200.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/93/ee/06/93ee06f8-ab49-16a2-9acf-87635298b557/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/11/3b/b7/113bb77c-97b8-c763-ee78-e8701e236079/cover200x200.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/b3/51/44/b351440c-fce9-8371-c5bf-a2f3493c43e5/cover200x200.jpeg",
"http://a1.mzstatic.com/us/r30/Music2/v4/d1/ab/9d/d1ab9d0a-111f-16bf-520d-1c2aaaab8d06/cover200x200.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/21/45/c6/2145c6ad-f2fd-d714-c83f-57a01dd54a31/cover200x200.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/18/7f/af/187fafde-55d1-6dfd-e5e6-90b1cf16b6d6/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/e0/9e/fa/e09efac1-3df7-a4c5-3b07-fa2f1ce266e6/cover200x200.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/61/2a/4b/612a4b37-e625-5085-db7b-6e8100444e41/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/a4/0b/3b/a40b3b10-56d1-a291-023d-4038b599b7f6/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/b0/c9/df/b0c9dfe5-ba45-2414-eb47-8808d00331b4/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/95/6f/cd/956fcd7d-8192-bde5-0a9b-5ac5d10886e8/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/bf/cc/eb/bfccebdf-80bd-bc64-83ae-c6e8345d119b/cover200x200.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/5a/ad/d0/5aadd01d-72be-66b3-27a2-e4714f16c84d/cover200x200.jpeg",
"http://a2.mzstatic.com/us/r30/Music/v4/46/3b/a1/463ba196-ca41-256c-c5f7-f149f4b85f4b/cover200x200.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/8b/3c/19/8b3c1901-1264-fb71-9489-56ca6d3a7836/cover200x200.jpeg"
];

// Album image URLs, 326x326px
// Used for album swooshes on iPad
var gURLsAlbum326 = [
"http://a1.mzstatic.com/us/r30/Music4/v4/b7/ec/d1/b7ecd1bf-1d39-aaf5-1ec2-0b583cf2e249/cover326x326.jpeg",
"http://a4.mzstatic.com/us/r30/Music6/v4/bc/03/18/bc031872-65bc-9503-fe33-cff45b2d5db1/cover326x326.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/7a/2e/a2/7a2ea294-67d9-ba94-ff4d-fedf28031a4d/cover326x326.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/ef/82/b2/ef82b24c-1f0e-953c-fc78-d0b0480d188e/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/7b/bf/52/7bbf52ed-f3d6-bbc2-4af2-3fc1d845729c/cover326x326.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/53/4b/d6/534bd648-bc26-1897-bd17-c8e5a3b3f174/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/3a/0e/ad/3a0ead6e-9895-1598-41eb-3dbec113db9b/cover326x326.jpeg",
"http://a4.mzstatic.com/us/r30/Music/v4/62/76/bc/6276bcbc-64bf-2e64-d234-50f2ba5bd444/cover326x326.jpeg",
"http://a4.mzstatic.com/us/r30/Music/v4/2c/45/ce/2c45cee0-bfce-faea-f9ff-6513825d2042/cover326x326.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/ea/50/5c/ea505c86-f6eb-c5fa-9c88-f8e82db3c419/cover326x326.jpeg",
"http://a2.mzstatic.com/us/r30/Music4/v4/cf/8a/7f/cf8a7ff6-3c4a-7e4c-8e77-de0b83b80991/cover326x326.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/93/ee/06/93ee06f8-ab49-16a2-9acf-87635298b557/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/11/3b/b7/113bb77c-97b8-c763-ee78-e8701e236079/cover326x326.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/b3/51/44/b351440c-fce9-8371-c5bf-a2f3493c43e5/cover326x326.jpeg",
"http://a1.mzstatic.com/us/r30/Music2/v4/d1/ab/9d/d1ab9d0a-111f-16bf-520d-1c2aaaab8d06/cover326x326.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/21/45/c6/2145c6ad-f2fd-d714-c83f-57a01dd54a31/cover326x326.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/18/7f/af/187fafde-55d1-6dfd-e5e6-90b1cf16b6d6/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/e0/9e/fa/e09efac1-3df7-a4c5-3b07-fa2f1ce266e6/cover326x326.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/61/2a/4b/612a4b37-e625-5085-db7b-6e8100444e41/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/a4/0b/3b/a40b3b10-56d1-a291-023d-4038b599b7f6/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/b0/c9/df/b0c9dfe5-ba45-2414-eb47-8808d00331b4/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/95/6f/cd/956fcd7d-8192-bde5-0a9b-5ac5d10886e8/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/bf/cc/eb/bfccebdf-80bd-bc64-83ae-c6e8345d119b/cover326x326.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/5a/ad/d0/5aadd01d-72be-66b3-27a2-e4714f16c84d/cover326x326.jpeg",
"http://a2.mzstatic.com/us/r30/Music/v4/46/3b/a1/463ba196-ca41-256c-c5f7-f149f4b85f4b/cover326x326.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/8b/3c/19/8b3c1901-1264-fb71-9489-56ca6d3a7836/cover326x326.jpeg"
];

// Album image URLs, 340x340px
// Used for product pages on iPad
var gURLsAlbum340 = [
"http://a1.mzstatic.com/us/r30/Music4/v4/b7/ec/d1/b7ecd1bf-1d39-aaf5-1ec2-0b583cf2e249/cover340x340.jpeg",
"http://a4.mzstatic.com/us/r30/Music6/v4/bc/03/18/bc031872-65bc-9503-fe33-cff45b2d5db1/cover340x340.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/7a/2e/a2/7a2ea294-67d9-ba94-ff4d-fedf28031a4d/cover340x340.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/ef/82/b2/ef82b24c-1f0e-953c-fc78-d0b0480d188e/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/7b/bf/52/7bbf52ed-f3d6-bbc2-4af2-3fc1d845729c/cover340x340.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/53/4b/d6/534bd648-bc26-1897-bd17-c8e5a3b3f174/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/3a/0e/ad/3a0ead6e-9895-1598-41eb-3dbec113db9b/cover340x340.jpeg",
"http://a4.mzstatic.com/us/r30/Music/v4/62/76/bc/6276bcbc-64bf-2e64-d234-50f2ba5bd444/cover340x340.jpeg",
"http://a4.mzstatic.com/us/r30/Music/v4/2c/45/ce/2c45cee0-bfce-faea-f9ff-6513825d2042/cover340x340.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/ea/50/5c/ea505c86-f6eb-c5fa-9c88-f8e82db3c419/cover340x340.jpeg",
"http://a2.mzstatic.com/us/r30/Music4/v4/cf/8a/7f/cf8a7ff6-3c4a-7e4c-8e77-de0b83b80991/cover340x340.jpeg",
"http://a2.mzstatic.com/us/r30/Music6/v4/93/ee/06/93ee06f8-ab49-16a2-9acf-87635298b557/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/11/3b/b7/113bb77c-97b8-c763-ee78-e8701e236079/cover340x340.jpeg",
"http://a1.mzstatic.com/us/r30/Music6/v4/b3/51/44/b351440c-fce9-8371-c5bf-a2f3493c43e5/cover340x340.jpeg",
"http://a1.mzstatic.com/us/r30/Music2/v4/d1/ab/9d/d1ab9d0a-111f-16bf-520d-1c2aaaab8d06/cover340x340.jpeg",
"http://a3.mzstatic.com/us/r30/Music/v4/21/45/c6/2145c6ad-f2fd-d714-c83f-57a01dd54a31/cover340x340.jpeg",
"http://a1.mzstatic.com/us/r30/Music/v4/18/7f/af/187fafde-55d1-6dfd-e5e6-90b1cf16b6d6/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/e0/9e/fa/e09efac1-3df7-a4c5-3b07-fa2f1ce266e6/cover340x340.jpeg",
"http://a3.mzstatic.com/us/r30/Music4/v4/61/2a/4b/612a4b37-e625-5085-db7b-6e8100444e41/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/a4/0b/3b/a40b3b10-56d1-a291-023d-4038b599b7f6/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music/v4/b0/c9/df/b0c9dfe5-ba45-2414-eb47-8808d00331b4/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/95/6f/cd/956fcd7d-8192-bde5-0a9b-5ac5d10886e8/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music6/v4/bf/cc/eb/bfccebdf-80bd-bc64-83ae-c6e8345d119b/cover340x340.jpeg",
"http://a5.mzstatic.com/us/r30/Music4/v4/5a/ad/d0/5aadd01d-72be-66b3-27a2-e4714f16c84d/cover340x340.jpeg",
"http://a2.mzstatic.com/us/r30/Music/v4/46/3b/a1/463ba196-ca41-256c-c5f7-f149f4b85f4b/cover340x340.jpeg",
"http://a4.mzstatic.com/us/r30/Music4/v4/8b/3c/19/8b3c1901-1264-fb71-9489-56ca6d3a7836/cover340x340.jpeg"
];

// iPad Carousel URLs, 1060x520px
var gURLsCarousel1060 = [
"http://a5.mzstatic.com/us/r30/Features/v4/d9/15/2b/d9152b13-52ab-31bf-6929-d2eed902452e/image-1060x520.jpeg",
"http://a5.mzstatic.com/us/r30/Features4/v4/ed/78/ee/ed78ee3e-066a-5fcb-3823-b325fe8006aa/image-1060x520.jpeg",
"http://a4.mzstatic.com/us/r30/Features2/v4/5b/51/b6/5b51b63c-241d-70aa-fc40-c27d522f2a9a/image-1060x520.jpeg",
"http://a5.mzstatic.com/us/r30/Features/v4/be/9d/d6/be9dd6f2-175e-7317-28de-16c10b92bfaf/image-1060x520.jpeg",
"http://a1.mzstatic.com/us/r30/Features4/v4/83/89/36/83893669-7c53-6f27-79de-c58b61eea422/image-1060x520.jpeg",
"http://a2.mzstatic.com/us/r30/Features2/v4/0e/5e/90/0e5e90d8-cb2e-0849-765b-b2fbcb730c32/image-1060x520.jpeg",
"http://a3.mzstatic.com/us/r30/Features4/v4/cc/6f/15/cc6f157e-f264-ffd5-636b-6c06ebe498e7/image-1060x520.jpeg",
"http://a5.mzstatic.com/us/r30/Features/v4/dd/32/4e/dd324e5b-ccda-08a3-6fa8-5c4b90ba72cd/image-1060x520.jpeg",
"http://a1.mzstatic.com/us/r30/Features2/v4/35/ac/23/35ac231a-bc35-dd2f-6c02-613f63a46fe9/image-1060x520.jpeg",
"http://a1.mzstatic.com/us/r30/Features/v4/43/fb/f6/43fbf6e6-1469-ae56-f4ef-58b08ec0779c/image-1060x520.jpeg",
"http://a4.mzstatic.com/us/r30/Features/v4/0b/1a/3a/0b1a3aed-05c6-ce99-069a-c12a891bcdfd/image-1060x520.jpeg",
"http://a5.mzstatic.com/us/r30/Features6/v4/4f/ac/11/4fac111b-7c89-3467-b016-baec9273547f/image-1060x520.jpeg",
"http://a5.mzstatic.com/us/r30/Features4/v4/76/8a/5c/768a5cae-24a7-9c3e-ce23-6f4c50f2cfd1/image-1060x520.jpeg"
];

// Brick URLs, 416x204px
var gURLsBrick416 = [
"http://a4.mzstatic.com/us/r30/Features6/v4/43/76/f4/4376f4dc-5654-a60e-c20c-b4cdc0e410d3/image-416x204.jpeg",
"http://a4.mzstatic.com/us/r30/Features6/v4/0e/64/ea/0e64ea55-ed83-c56d-6bb0-dd686e3d7dcc/image-416x204.jpeg",
"http://a4.mzstatic.com/us/r30/Features2/v4/90/dc/90/90dc9073-734e-77a5-3045-44dd81588061/image-416x204.jpeg",
"http://a3.mzstatic.com/us/r30/Features/v4/8e/7f/15/8e7f15ef-383b-5d1e-44c7-cc3b3c763456/image-416x204.jpeg",
"http://a2.mzstatic.com/us/r30/Features6/v4/b0/4d/38/b04d380b-dd0b-2ea7-3736-7cc37a1276b3/image-416x204.jpeg",
"http://a2.mzstatic.com/us/r30/Features6/v4/b5/48/ce/b548ced8-da3e-e765-777f-e23d11f1e924/image-416x204.jpeg",
"http://a3.mzstatic.com/us/r30/Features/v4/32/83/1b/32831b48-8e6c-77d2-f14b-9d4a100ad48d/image-416x204.jpeg",
"http://a3.mzstatic.com/us/r30/Features/v4/eb/bb/34/ebbb34fb-9451-84e0-7f99-dd525370054a/image-416x204.jpeg",
"http://a2.mzstatic.com/us/r30/Features4/v4/94/48/7c/94487ccf-e742-fc68-96e8-2018710b347f/image-416x204.jpeg",
"http://a5.mzstatic.com/us/r30/Features4/v4/61/6f/4b/616f4b43-485e-ef58-c386-5f935996ca6f/image-416x204.jpeg",
"http://a2.mzstatic.com/us/r30/Features4/v4/bd/2c/2f/bd2c2f7a-7ee6-7d78-9e39-23cea1fd6552/image-416x204.jpeg",
"http://a5.mzstatic.com/us/r30/Features/v4/e5/fa/dd/e5fadd38-6b98-856d-ca2c-86b9d30aa46e/image-416x204.jpeg",
"http://a5.mzstatic.com/us/r30/Features2/v4/a7/b5/8f/a7b58f1c-2f1a-0dfa-9e5d-421fc7c29714/image-416x204.jpeg",
"http://a2.mzstatic.com/us/r30/Features6/v4/8c/0c/d1/8c0cd16f-f551-f1fc-7b6a-423edd265e93/image-416x204.jpeg",
"http://a5.mzstatic.com/us/r30/Features/v4/db/8f/c8/db8fc868-40cc-e319-e46e-191ce48eee84/image-416x204.jpeg"
];
