const formatTime = (sec) => {
        const hrs = Math.floor(sec/3600);
        const min = Math.floor((sec%3600)/60);
        const secs = sec%60;
        return `${hrs.toString().padStart(2, '0')}:${min.toString(2, '0')}:${secs.toString().padStart(2, '0')}`;  
    };
