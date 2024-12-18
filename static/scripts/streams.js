if (Hls.isSupported()) {
    const video = document.getElementById('video');
    const hls = new Hls();
    hls.loadSource('https://s80283.cdn.ngenix.net/s80283-media-origin/lvs/test/index.m3u8');
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
    });
}
else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = 'https://s80283.cdn.ngenix.net/s80283-media-origin/lvs/test/index.m3u8';
    video.addEventListener('loadedmetadata', function() {
        video.play();
    });
}
