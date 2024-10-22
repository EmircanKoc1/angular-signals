import { JsonPipe } from '@angular/common';
import { Component, computed, ElementRef, Signal, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  numberSignal: WritableSignal<number> = signal<number>(5);
  objectSignal: WritableSignal<Person> = signal<Person>({
    name: "emir",
    surname: "koç",
    age: 22
  });

  signalName: WritableSignal<string> = signal<string>("emircan");
  signalSurname: WritableSignal<string> = signal<string>(" Koç");

  computedSignal: Signal<string> = computed<string>(() => {
    return this.signalName() + this.signalSurname();
  });

  @ViewChild("input1") input1Ref!: ElementRef;


  inrementNumberSignal() {
    this.numberSignal.update(data => ++data)
  }

  setInput1Value(): void {
    this.numberSignal.set(this.input1Ref.nativeElement.value);
  }

  setObjectSignal(): void {
    this.objectSignal.set({ ...this.objectSignal(), age: 33 });
  }


}

type Person = {
  name: string,
  surname: string,
  age: number
}