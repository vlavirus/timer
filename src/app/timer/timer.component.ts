import { Component, DoCheck, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

import { timer, Observable, interval, Subscription  } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})

export class TimerComponent implements DoCheck {
	timer: number
	sec: number
	min: number
	hour: number
	sub: Subscription = new Subscription()
	lastKeyDownTime!: number

	constructor() {
		this.timer = 0
		this.sec = 0
		this.min = 0
		this.hour = 0
		this.sub.closed = true
	}
	
	ngDoCheck() {
		this.sec = Math.floor( this.timer % 60 )
		this.min =  Math.floor( (this.timer/60) % 60 )
		this.hour = Math.floor( (this.timer/(60*60) % 24) )
	}

	private clear() {
		this.timer = 0
		this.sec = 0
		this.min = 0
		this.hour = 0
	}

	private stop() {
		this.sub.unsubscribe()
		this.clear()
	}

	start() {
		const timerStream$ = timer(1000, 1000)
		this.sub = timerStream$.subscribe(() => this.timer += 1)
	}

	stopTimer() {
		this.sub.unsubscribe()
		this.clear()
	}

	wait(e: any) {
		if ((Date.now() - this.lastKeyDownTime) <= 300 ) {
			this.sub.unsubscribe()
		} else {
			this.lastKeyDownTime = Date.now()
		}
	}

	reset() {
		this.sub.unsubscribe()
		this.clear()
		this.start()
	}
}
