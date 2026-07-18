import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.scss'],
})
export class VideoCallComponent {
  @Input() contactName = 'Luna';
  @Output() close = new EventEmitter<void>();

  micOn = true;
  camOn = true;
  minimized = false;

  // TODO: substituir por streams reais via WebRTC (RTCPeerConnection + sinalização)
  toggleMic() { this.micOn = !this.micOn; }
  toggleCam() { this.camOn = !this.camOn; }
  toggleMinimize() { this.minimized = !this.minimized; }
  hangUp() { this.close.emit(); }
}
