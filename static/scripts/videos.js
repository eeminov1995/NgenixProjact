document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('video');
    var playlist = [
        'https://s51370.cdn.ngenix.net/s51370-vod-origin/ods/test1.mp4/index.m3u8',
        'https://s51370.cdn.ngenix.net/s51370-vod-origin/ods/test2.mp4/index.m3u8',
        'https://s51370.cdn.ngenix.net/s51370-vod-origin/ods/test3.mp4/index.m3u8'
    ];
    var currentVideoIndex = 0;
    var hls = null;

    function loadVideo(index) {
        var videoSrc = playlist[index];
        if (hls) {
            hls.destroy();
        }
        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }
        updateControlsVisibility(index);
    }

    function updateControlsVisibility(index) {
        document.getElementById('prev-video').style.display = index > 0 ? 'inline-block' : 'none';
        document.getElementById('next-video').style.display = index < playlist.length - 1 ? 'inline-block' : 'none';
    }

    document.querySelectorAll('.video-thumbnail').forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function() {
            var src = thumbnail.getAttribute('data-src');
            currentVideoIndex = playlist.indexOf(src);
            document.querySelector('.video-container').style.display = 'block';
            loadVideo(currentVideoIndex);
        });
    });

    document.getElementById('prev-video').addEventListener('click', function() {
        if (currentVideoIndex > 0) {
            currentVideoIndex--;
            loadVideo(currentVideoIndex);
        }
    });

    document.getElementById('next-video').addEventListener('click', function() {
        if (currentVideoIndex < playlist.length - 1) {
            currentVideoIndex++;
            loadVideo(currentVideoIndex);
        }
    });

    document.getElementById('close-video').addEventListener('click', function() {
        video.pause();
        video.currentTime = 0;
        document.querySelector('.video-container').style.display = 'none';
        if (hls) {
            hls.destroy();
        }
    });
});