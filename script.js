const days = document.getElementById('days')
const months = document.getElementById('months')
const years = document.getElementById('years')

const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
    let flag = false
    // Errors
    const validDateErr = document.getElementById('valid-date')
    const pastErr = document.getElementById('pastErr')
    const validMonthErr = document.getElementById('valid-month')
    const validDayErr = document.getElementById('valid-day')
    const requiredDay = document.getElementById('required-day')
    const requiredMonth = document.getElementById('required-month')
    const requiredYear = document.getElementById('required-year')

    validDateErr.classList.add('hidden')
    pastErr.classList.add('hidden')
    validDayErr.classList.add('hidden')
    validMonthErr.classList.add('hidden')
    requiredDay.classList.add('hidden')
    requiredMonth.classList.add('hidden')
    requiredYear.classList.add('hidden')

    // Outputs
    const day = document.getElementById('day')
    const month = document.getElementById('month')
    const year = document.getElementById('year')

    day.classList.remove('border-lightRed')
    month.classList.remove('border-lightRed')
    year.classList.remove('border-lightRed')

    // Labels
    const dayLabel = document.getElementById('day-label')
    const monthLabel = document.getElementById('month-label')
    const yearLabel = document.getElementById('year-label')

    dayLabel.classList.remove('text-lightRed')
    monthLabel.classList.remove('text-lightRed')
    yearLabel.classList.remove('text-lightRed')

    dayLabel.classList.add('text-smokeyGrey')
    monthLabel.classList.add('text-smokeyGrey')
    yearLabel.classList.add('text-smokeyGrey')

    let empty = false
    if (!day.value.trim()) {
        requiredDay.classList.remove('hidden')
        day.classList.add('border-lightRed')
        dayLabel.classList.add('text-lightRed')
        dayLabel.classList.remove('text-smokeyGrey')
        empty = true
    }

    if (!month.value.trim()) {
        requiredMonth.classList.remove('hidden')
        month.classList.add('border-lightRed')
        monthLabel.classList.add('text-lightRed')
        monthLabel.classList.remove('text-smokeyGrey')
        empty = true
    }

    if (!year.value.trim()) {
        requiredYear.classList.remove('hidden')
        year.classList.add('border-lightRed')
        yearLabel.classList.add('text-lightRed')
        yearLabel.classList.remove('text-smokeyGrey')
        empty = true
    }

    if (empty) return

    const date = moment(
        `${day.value} ${month.value} ${year.value}`,
        'DD MM YYYY'
    )

    if (day.value > 31 || day.value < 1) {
        validDayErr.classList.remove('hidden')
        day.classList.add('border-lightRed')
        dayLabel.classList.add('text-lightRed')
        dayLabel.classList.remove('text-smokeyGrey')
        flag = true
    }
    if (month.value > 12 || month.value < 1) {
        validMonthErr.classList.remove('hidden')
        month.classList.add('border-lightRed')
        monthLabel.classList.add('text-lightRed')
        monthLabel.classList.remove('text-smokeyGrey')
        flag = true
    }
    if (year.value > new Date().getFullYear() || year.value < 0) {
        pastErr.classList.remove('hidden')
        year.classList.add('border-lightRed')
        yearLabel.classList.add('text-lightRed')
        yearLabel.classList.remove('text-smokeyGrey')
        flag = true
    }

    if (flag) return

    if (!date.isValid()) {
        validDateErr.classList.remove('hidden')
        day.classList.add('border-lightRed')
        month.classList.add('border-lightRed')
        year.classList.add('border-lightRed')

        dayLabel.classList.add('text-lightRed')
        monthLabel.classList.add('text-lightRed')
        yearLabel.classList.add('text-lightRed')

        dayLabel.classList.remove('text-smokeyGrey')
        monthLabel.classList.remove('text-smokeyGrey')
        yearLabel.classList.remove('text-smokeyGrey')
        return
    }

    const { y, m, d } = convertMS(new Date() - date.toDate())

    years.innerText = y === 0 ? '--' : y
    months.innerText = m === 0 ? '--' : m
    days.innerText = d === 0 ? '--' : d
})

function convertMS(milliseconds) {
    const YEAR = 31536000000
    const MONTH = 2592000000
    const DAY = 86400000

    const y = Math.floor(milliseconds / YEAR)
    milliseconds -= y * YEAR

    const m = Math.floor(milliseconds / MONTH)
    milliseconds -= m * MONTH

    const d = Math.floor(milliseconds / DAY)

    return { y, m, d }
}
