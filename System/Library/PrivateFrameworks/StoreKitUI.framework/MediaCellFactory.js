function AlbumCellFactory(album) {
	var itemCount = album.itemCount;
	var detailsString = itemCount.toString();
	if (itemCount == 1) {
		detailsString += ' song, ';
	}
	else {
		detailsString += ' songs, ';
	}
	detailsString += parseInt(album.playbackDuration / 60).toString() + ' min';
    return {
    	't':'lockup',
    	'c':[
    		{
    			't':'img',
    			'h':88,
    			'w':88,
    			'src':'x-itml-media:/?id=' + album.artworkID + '&w=88&h=88'
    		},
    		{
    			't':'title',
    			's':'albumTitle',
    			'v':album.albumName
    		},
    		{
    			't':'subtitle',
    			's':'albumSubtitle',
    			'v':album.albumAlbumArtist
    		},
    		{
    			't':'text',
    			's':'albumDetails',
    			'v':detailsString
    		}
    	]
    };
}
