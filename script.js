let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMilliseconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

function updateStopwatch() {
    stopwatchMilliseconds++;
    
    if (stopwatchMilliseconds === 100) {
        stopwatchMilliseconds = 0;
        stopwatchSeconds++;
    }
    if (stopwatchSeconds === 60) {
        stopwatchSeconds = 0;
        stopwatchMinutes++;
    }
    if (stopwatchMinutes === 60) {
        stopwatchMinutes = 0;
        stopwatchHours++;
    }

    // Update display
    $('#stopwatch-hour').text(addTrailingZero(stopwatchHours));
    $('#stopwatch-min').text(addTrailingZero(stopwatchMinutes));
    $('#stopwatch-sec').text(addTrailingZero(stopwatchSeconds));
    $('#stopwatch-ms').text(addTrailingZero(stopwatchMilliseconds));
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 10);
        stopwatchRunning = true;
        $('.start-stopwatch').hide();
        $('.lap-stopwatch, .back-btn').show();
    }
}

function stopStopwatch() {
    if (stopwatchRunning) {
        clearInterval(stopwatchInterval);
        stopwatchRunning = false;
        $('.start-stopwatch').show();
        $('.lap-stopwatch, .back-btn').hide();
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMilliseconds = 0;
    laps = 0;
    
    // Reset display
    $('#stopwatch-hour').text('00');
    $('#stopwatch-min').text('00');
    $('#stopwatch-sec').text('00');
    $('#stopwatch-ms').text('00');
    
    // Clear laps and reset buttons
    $('.laps').empty();
    $('.start-stopwatch').show();
    $('.lap-stopwatch, .back-btn').hide();
}

function addTrailingZero(number) {
    return number < 10 ? '0' + number : number;
}

// Event Handlers
$(document).ready(function() {
    // Initialize button states
    $('.lap-stopwatch, .back-btn').hide();

    $('.start-stopwatch').click(startStopwatch);
    
    $('.back-btn').click(stopStopwatch);
    
    $('.reset-stopwatch').click(resetStopwatch);
    
    $('.lap-stopwatch').click(function() {
        laps++;
        const lapTime = `${addTrailingZero(stopwatchHours)}:${addTrailingZero(stopwatchMinutes)}:${addTrailingZero(stopwatchSeconds)}:${addTrailingZero(stopwatchMilliseconds)}`;
        
        $('.laps').prepend(
            `<div class="lap">
                <p>Lap ${laps}</p>
                <p>${lapTime}</p>
            </div>`
        );
    });
});
