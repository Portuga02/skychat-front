import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-voice-call',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './voice-call.component.html',
  styleUrls: ['./voice-call.component.scss'],
})
export class VoiceCallComponent implements OnInit, OnDestroy {
  @Input() contactName = 'Luna';
  @Output() close = new EventEmitter<void>();

  micOn = true;
  speakerOn = false;
  seconds = 0;
  private timer: any;

  ngOnInit() {
    // TODO: só começar a contar quando a chamada for de fato atendida (evento do WebRTC/sinalização)
    this.timer = setInterval(() => this.seconds++, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  get formattedTime(): string {
    const m = Math.floor(this.seconds / 60).toString().padStart(2, '0');
    const s = (this.seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  toggleMic() { this.micOn = !this.micOn; }
  toggleSpeaker() { this.speakerOn = !this.speakerOn; }
  hangUp() { this.close.emit(); }
}
