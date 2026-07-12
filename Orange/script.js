// =====================================
// START DATE
// =====================================

const startDate = new Date("2026-02-25T13:35:00");

// =====================================
// SHOW DATE
// =====================================

const dateElement = document.querySelector(".date");

dateElement.textContent = startDate.toLocaleString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
});

// =====================================
// NUMBER TO WORDS
// =====================================

const ones = [
    "", "One", "Two", "Three", "Four", "Five",
    "Six", "Seven", "Eight", "Nine", "Ten",
    "Eleven", "Twelve", "Thirteen", "Fourteen",
    "Fifteen", "Sixteen", "Seventeen",
    "Eighteen", "Nineteen"
];

const tens = [
    "", "", "Twenty", "Thirty", "Forty",
    "Fifty", "Sixty", "Seventy",
    "Eighty", "Ninety"
];

const scales = [
    "",
    "Thousand",
    "Million",
    "Billion",
    "Trillion"
];

function convertHundreds(num) {

    let result = "";

    if (num >= 100) {

        result += ones[Math.floor(num / 100)] + " Hundred ";

        num %= 100;

    }

    if (num >= 20) {

        result += tens[Math.floor(num / 10)] + " ";

        num %= 10;

    }

    if (num > 0) {

        result += ones[num];

    }

    return result.trim();

}

function numberToWords(num) {

    if (num === 0) return "Zero";

    let words = "";
    let scale = 0;

    while (num > 0) {

        const chunk = num % 1000;

        if (chunk !== 0) {

            words =
                convertHundreds(chunk) +
                " " +
                scales[scale] +
                " " +
                words;

        }

        num = Math.floor(num / 1000);

        scale++;

    }

    return words.replace(/\s+/g, " ").trim();

}

// =====================================
// ANIMATE NUMBER
// =====================================

function setValue(id, value) {

    const el = document.getElementById(id);

    const formatted = value.toLocaleString();

    if (el.textContent !== formatted) {

        el.style.opacity = 0.3;

        setTimeout(() => {

            el.textContent = formatted;

            el.style.opacity = 1;

        }, 120);

    }

}

// =====================================
// UPDATE
// =====================================

function updateCounter() {

    const now = new Date();

    const diff = now - startDate;

    if (diff < 0) return;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Numbers

    setValue("days", days);
    setValue("hours", hours);
    setValue("minutes", minutes);
    setValue("seconds", seconds);

    // Words

    document.getElementById("daysWords").textContent =
        numberToWords(days);

    document.getElementById("hoursWords").textContent =
        numberToWords(hours);

    document.getElementById("minutesWords").textContent =
        numberToWords(minutes);

    document.getElementById("secondsWords").textContent =
        numberToWords(seconds);

    // Footer

    document.getElementById("liveTime").textContent =
        seconds.toLocaleString() + " seconds and counting...";

}

// =====================================

updateCounter();

setInterval(updateCounter, 1000);