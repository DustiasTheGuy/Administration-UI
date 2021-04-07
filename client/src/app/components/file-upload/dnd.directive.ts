import { 
  Directive, 
  HostBinding, 
  HostListener, 
  Output, 
  EventEmitter 
} from '@angular/core';

@Directive({ selector: '[appDnd]' })
export class DndDirective {
  @Output() newFiles = new EventEmitter<FileList | undefined>();
  @HostBinding('class.file-over') fileOver: boolean = false;

  constructor() {}


  @HostListener('dragover', ['$event']) 
  onDragOver(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) 
  onDragLeave(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) 
  onFileDrop(e: DragEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.fileOver = false;
    this.newFiles.emit(e.dataTransfer?.files);
  }
}
