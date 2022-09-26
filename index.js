class ASTimer {
	constructor(selector) {
		this.timer = document.querySelector(selector)

		if (! this.timer) {
			console.error(`Please provide correct selector for timer element - '${selector}' is not correct.`)
			return
		}

		if (!this.setTimerElements()) return

		if (!this.setDeadline()) return

		this.setTimer()
	}

	setTimerElements() {
		this.days		= this.timer.querySelector('.days')
		this.hours		= this.timer.querySelector('.hours')
		this.minutes	= this.timer.querySelector('.minutes')
		this.seconds	= this.timer.querySelector('.seconds')

		if (!this.days || !this.hours || !this.minutes || !this.seconds) {
			console.error('Please add require elements inside your timer with these class names: days, hours, minutes, seconds.')
			return false
		}

		return true
	}

	setDeadline() {
		this.year	= this.timer.dataset.year
		this.month	= this.timer.dataset.month
		this.day	= this.timer.dataset.day

		if (!this.year || !this.month || !this.day) {
			console.error('Please add data-year, data-month and data-day attributes to your timer element.')
			return false
		}

		this.endDate = `${this.year}-${this.month}-${this.day}`
		return true
	}

	zeroNum(num) {
		if (num >= 0 && num < 10) return `0${num}`
		return num
	}

	getTime() {
		const ms	= Date.parse(this.endDate) - Date.now(),
			days	= Math.floor(ms / (1000 * 60 * 60 * 24)),
			hours	= Math.floor((ms / (1000 * 60 * 60)) % 24),
			minutes	= Math.floor((ms / (1000 * 60)) % 60),
			seconds	= Math.floor((ms / 1000) % 60)

		return {
			total: ms,
			days,
			hours,
			minutes,
			seconds
		}
	}

	checkForFade(timerData) {
		if (timerData.seconds === 0) {
			this.minutes.classList.add('fade')
			setTimeout(() => this.minutes.classList.remove('fade'), 900)
		}

		if (timerData.seconds === 0 && timerData.minutes === 0) {
			this.hours.classList.add('fade')
			setTimeout(() => this.hours.classList.remove('fade'), 900)
		}

		if (timerData.seconds === 0 && timerData.minutes === 0 && timerData.hours === 0) {
			this.days.classList.add('fade')
			setTimeout(() => this.days.classList.remove('fade'), 900)
		}
	}

	clearFade() {
		this.seconds.classList.remove('fade')
		this.minutes.classList.remove('fade')
		this.hours.classList.remove('fade')
		this.days.classList.remove('fade')
	}

	setTimer() {
		let timerInterval

		const updateClock = () => {
			const timerData	= this.getTime()

			this.days.innerHTML 	= this.zeroNum(timerData.days)
			this.hours.innerHTML 	= this.zeroNum(timerData.hours)
			this.minutes.innerHTML 	= this.zeroNum(timerData.minutes)
			this.seconds.innerHTML 	= this.zeroNum(timerData.seconds)

			this.seconds.classList.add('fade')
			setTimeout(() => this.seconds.classList.remove('fade'), 900)

			this.checkForFade(timerData)

			if (timerData.total <= 0) {
				clearInterval(timerInterval)
				this.days.innerHTML = this.hours.innerHTML = this.minutes.innerHTML = this.seconds.innerHTML = '00'
				this.clearFade()
			}
		}

		updateClock()
		timerInterval = setInterval(updateClock, 1000)
	}
}

export default ASTimer