/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

var ABOUT_ME_TEXT = 'Drake (born Aubrey Drake Graham on October 24, 1986) is a Canadian ' +
    'rapper, singer, and actor. He first rose to fame playing Jimmy Brooks on the teen ' +
    'drama Degrassi: The Next Generation before transitioning to a record-breaking music ' +
    'career that popularized rap-singing and R&B sensibilities in modern hip-hop.';

var lastFocusedEl = null;

function showAlert(title, message) {
    lastFocusedEl = document.activeElement;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = message;
    document.getElementById('modal').classList.add('is-open');
    document.getElementById('modalClose').focus();
}

function closeAlert() {
    document.getElementById('modal').classList.remove('is-open');
    if (lastFocusedEl) {
        lastFocusedEl.focus();
    }
}

function wireModal() {
    document.getElementById('modalClose').addEventListener('click', closeAlert);
    document.getElementById('modalBackdrop').addEventListener('click', closeAlert);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && document.getElementById('modal').classList.contains('is-open')) {
            closeAlert();
        }
    });
}

var MANILA_TIME_FORMAT = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    weekday: 'short',
    month: 'short',
    day: 'numeric'
});

function initClock() {
    var timeEl = document.getElementById('clockTime');
    var dateEl = document.getElementById('clockDate');

    function tick() {
        var parts = {};
        MANILA_TIME_FORMAT.formatToParts(new Date()).forEach(function (part) {
            parts[part.type] = part.value;
        });
        timeEl.textContent = parts.hour + ':' + parts.minute + ':' + parts.second;
        dateEl.textContent = '● ' + parts.weekday + ', ' + parts.month + ' ' + parts.day;
    }

    tick();
    setInterval(tick, 1000);
}

function showWelcomeMessage() {
    document.getElementById('welcomeMsg').textContent = "Started from the bottom, now we're here";
}

function exitApp() {
    if (window.navigator && navigator.app && typeof navigator.app.exitApp === 'function') {
        navigator.app.exitApp();
    } else {
        showAlert('Exit', 'Exit is only available when running inside the Cordova app.');
    }
}

function wireButtons() {
    document.getElementById('aboutBtn').addEventListener('click', function () {
        showAlert('About Me', ABOUT_ME_TEXT);
    });
    document.getElementById('courseBtn').addEventListener('click', function () {
        showAlert('My Course', 'Computer Science — Application Development\nYear & Section: 2026 O\'Block');
    });
    document.getElementById('exitBtn').addEventListener('click', exitApp);
}

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    initClock();
    showWelcomeMessage();
    wireModal();
    wireButtons();
}
